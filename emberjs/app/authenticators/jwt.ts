// @ts-ignore
import Base from 'ember-simple-auth/authenticators/base';
import { inject as service } from '@ember/service';
import { Registry as Services } from '@ember/service';

export default class CustomAuthenticator extends Base {

  @service axios!: Services["axios"];

  async restore(data: { access_token?: string }) {
    if (data.access_token) return data;
    // TODO: check for expire
    throw new Error("no session")
  }

  async authenticate(username: string, password: string) {
    const o = await this.axios.request({
      method: "POST",
      url: "/api/login",
      data: {
        username,
        password
      }
    })
    return o.data;
  }

  invalidate(data: any) {
    return Promise.resolve(data);
  }
}
