/* eslint-disable @typescript-eslint/camelcase */
import { Controller, Post, Body, Res, UsePipes, ValidationPipe, ClassSerializerInterceptor, UseInterceptors, UnauthorizedException } from '@nestjs/common';
import { IsString, IsNotEmpty } from 'class-validator';
import { People } from '../entity/person';
import { sso } from '../lib/sso';
import { bcryptEqual, bcryptHash } from '../lib/bcrypt';
import { englib } from '../lib/englib';
import { jwtSign } from '../lib/jwt';
import { Response } from 'express';


class LoginDto {
  @IsNotEmpty()
  @IsString() username: string;
  @IsNotEmpty()
  @IsString() password: string;
};

@Controller("/api")
export class AuthController {
  @Post("/login") 
  async index(@Body() cred: LoginDto, @Res() response: Response) {
    const me = await People.filter({ studentId: cred.username }).nth(0).default(null).run();
    if (!me) {
      const s = await sso(cred.username, cred.password);
      const e = await englib(cred.username);
      const wr = await People.insert({ ...s, ...e, password: bcryptHash(cred.password), roles: [] }).run();
      response
        .status(201)
        .send({ data: { access_token: jwtSign({ id: wr.generated_keys[0] }) }});
    }
    else if (bcryptEqual(cred.password, me.password)) {
      response
        .status(200)
        .send({ data: { access_token: jwtSign({ id: me.id }) }});
    } else {
      throw new UnauthorizedException('username or password is wrong');
    }
  }
}