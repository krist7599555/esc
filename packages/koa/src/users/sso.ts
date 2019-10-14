import _ from 'lodash';
import axios from 'axios';
import faculty from './faculty';
import qs from 'qs';

const SSO_URL = 'https://account.it.chula.ac.th';
const SSO_KILL = ticket => `${SSO_URL}/resources/tickets/${ticket}`;
const SSO_LOGIN = () => `${SSO_URL}/login`;
const SSO_USER = () => `${SSO_URL}/resources/users/me`;

export async function login(username: string, password: string): Promise<string> {
  const res = await axios.get(SSO_LOGIN(), {
    withCredentials: true,
    params: {
      username: username.slice(0, 8),
      password: password,
      service: 'https://account.it.chula.ac.th/html',
      serviceName: 'Chula+SSO'
    }
  });

  if (_.get(res.data, 'type') == 'error') {
    throw new Error(_.get(res.data, 'content', 'SSO login error'));
  }
  const cookie = _.get(res.headers, "['set-cookie'][0]");
  const DeeTGT = _.get(qs.parse(cookie), 'DeeTGT');
  return DeeTGT;
}

export async function validate(ticket: string): Promise<User> {
  const raw = await axios
    .get(SSO_USER(), {
      headers: {
        'accept-encoding': 'gzip;q=0,deflate,sdch',
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.131 Safari/537.36',
        Cookie: `DeeTGT=${ticket}`
      }
    })
    .then(res => res.data);

  const facultyNUM = raw.ouid.slice(-2);
  const year = raw.ouid.slice(0, 2);

  return {
    ticket: ticket,
    ouid: raw.ouid,
    // pwid: encrypt(password),
    // titleTH: null,
    // titleEN: null,
    nameTH: raw.firstnameTH,
    nameEN: raw.firstname,
    surnameTH: raw.lastnameTH,
    surnameEN: raw.lastname,
    facultyNUM: +facultyNUM,
    facultyTH: faculty[facultyNUM].nameTH,
    facultyEN: faculty[facultyNUM].nameEN,
    facultyABBR: faculty[facultyNUM].nameABBR,
    year: +year
  };
}

export function logout(ticket) {
  return axios.delete(SSO_KILL(ticket)).then(res => res.data);
}
