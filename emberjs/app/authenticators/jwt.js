import Base from 'ember-simple-auth/authenticators/base';
import { inject as service } from '@ember/service';

export default class CustomAuthenticator extends Base {

  @service axios;

  async restore(data) {
    if (data.access_token) return data;
    // TODO: check for expire
    throw new Error("no session")
  }

  async authenticate(username, password) {
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

  invalidate(data) {
    return Promise.resolve(data);
  }
}
