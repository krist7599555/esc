import * as qs from 'qs';
import { HttpException } from '@nestjs/common';
import { map, pluck, tap, retryWhen, delay, take, catchError } from 'rxjs/operators';
import { throwError, defer, of } from 'rxjs';
import axios from 'axios';
import { AxiosRequestConfig } from 'axios';

import { IsString, IsNumberString, Length, validateOrReject, IsNotEmpty } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { ValidationException } from '../errors/validation.exception';
import { ClassType } from 'class-transformer/ClassTransformer';

function axios_observable<T>(conf: AxiosRequestConfig) {
  return defer(() => axios.request(conf));
}

export class SsoServerException extends HttpException {
  constructor() {
    super('sso server error', 500);
  }
}

interface SsoUser {
  disable: boolean;
  email: string;
  firstname: string;
  firstnameth: string;
  gecos: string;
  lastname: string;
  lastnameth: string;
  ouid: string;
  roles: string[];
  uid: string;
  username: string;
}

class LoginDto {
  @IsNumberString()
  @Length(10, 10)   username;

  @IsString()
  @IsNotEmpty() password;
}

async function CheckDto<T, V>(cls: ClassType<T>, obj: V) {
  const res = plainToClass<T, V>(cls, obj);
  try {
    await validateOrReject(res, { forbidNonWhitelisted: true });
    return res;
  } catch(e) {
    throw new ValidationException(e);
  }
}

class SSO {
  static async ticket(login_dto: LoginDto): Promise<string> {
    login_dto = await CheckDto(LoginDto, login_dto);
    const { username, password } = login_dto;
    return axios_observable<any>({
      method:  'post',
      baseURL: 'https://account.it.chula.ac.th',
      url:     '/login',
      data:    qs.stringify({
        username:    username && username.slice(0, +username.slice(0, 2) > 61 ? 10 : 8),
        password:    password,
        service:     'https://account.it.chula.ac.th/html/',
        serviceName: 'ESC chula DEV',
      }),
      headers: { accept: 'application/json' },
    })
      .pipe(
        catchError(e => throwError(e.response.status == 403 ? new SsoServerException() : e)),
        retryWhen(error =>
          error.pipe(
            map(err => {
              if (err instanceof SsoServerException) {
                console.error(err.message);
                return of('retry');
              } else {
                return throwError(err); // no retry
              }
            }),
            take(5),
            delay(300),
          )
        ),
        pluck('data', 'ticket'),
        tap(ticket => {
          if (!ticket) throw new HttpException('username or password is wrong', 400);
        })
      ).toPromise();
  }
};

function ticket_validate(ticket: string) {
  return axios_observable<SsoUser>({
    method:  'get',
    baseURL: 'https://account.it.chula.ac.th',
    url:     '/serviceValidation',
    params:  { ticket },
    headers: {
      DeeAppId:     'dc2326fef061a32bea16242be5941c7d403f485fa52fdfc69d145e3c3be2fb05',
      DeeAppSecret: 'b3ed7ba73d5c455d9a9ab7a03cb11829ac141b4c07d535de281d244de779a6a847e430a8806ef6fb5e9bf928414e4c444465cbf0347eb5dab9b7a0a0b532e2e5',
    },
  })
    .pipe(
      catchError(e => throwError(e.response.status == 403 ? new SsoServerException() : e)),
      // retryWhen(error =>
      //   error.pipe(
      //     map(err => {
      //       if (err instanceof SsoServerException) {
      //         console.error(err.message);
      //         return of('retry');
      //       } else {
      //         return throwError(err); // no retry
      //       }
      //     }),
      //     take(5),
      //     delay(300),
      //   )
      // ),
      pluck('data'),
      map(raw => ({
        id:        raw.ouid as string,
        nameTH:    raw.firstnameth as string,
        nameEN:    raw.firstname as string,
        surnameTH: raw.lastnameth as string,
        surnameEN: raw.lastname as string,
        faculty:   +raw.ouid.slice(-2) as number,
        year:      +raw.ouid.slice(0, 2) as number,
      })),
    ).toPromise();
}

export async function login(username: string, password: string) {
  const tok = await SSO.ticket({ username, password });
  return await ticket_validate(tok);
}


// curl 'https://account.it.chula.ac.th/login' - H 'Connection: keep-alive' - H 'Pragma: no-cache' - H 'Cache-Control: no-cache' - H 'Accept: application/json, text/javascript, */*; q=0.01' - H 'Sec-Fetch-Dest: empty' - H 'X-Requested-With: XMLHttpRequest' - H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.122 Safari/537.36' - H 'Content-Type: application/x-www-form-urlencoded; charset=UTF-8' - H 'Origin: https://account.it.chula.ac.th' - H 'Sec-Fetch-Site: same-origin' - H 'Sec-Fetch-Mode: cors' - H 'Referer: https://account.it.chula.ac.th/html/login.html?service=https%3A%2F%2Faccount.it.chula.ac.th%2Fhtml%2F&serviceName=Chula+SSO' - H 'Accept-Language: en,da;q=0.9,th;q=0.8,es;q=0.7' - H 'Cookie: visid_incap_1832250=LAMUncAASFmmy7M1tYUJ6vL61FwAAAAAQUIPAAAAAAD8APuIQPXiZlzKbLcnPvFU; _ga=GA1.3.381410725.1583566423; incap_ses_1037_1832250=2DHVKTvR5GbFLBPsAytkDjtRY14AAAAABfbmwg40fc4yfnhK45pg7Q==; visid_incap_1832240=vkRO5zuHSG2zFlCxsRHkQzvDaV4AAAAAQUIPAAAAAACAo3qNFaSMMkkifHvo4yZu; incap_ses_1011_1832240=HXeQVxiNVU+kL22pDO0HDjvDaV4AAAAAdPK/G6ayTUhZYuHteIPDPg==; incap_ses_1011_1832250=1kQyLbQ/6S/VU22pDO0HDnzDaV4AAAAAyPKIC40sNIgdi0OSfekYiw==; _gid=GA1.3.633335769.1584259562; JSESSIONID=2CB4E3E9FCB6CE37E637313E972F6C49' --data
// username=60313017&password=krist7599555&service=https%3A%2F%2Faccount.it.chula.ac.th%2Fhtml%2F&serviceName=Chula+SSO' --compressed
// username=60313017&password=krist7599555&service=https%3A%2F%2Faccount.it.chula.ac.th%2Fhtml&serviceName=Chula%2BSSO
