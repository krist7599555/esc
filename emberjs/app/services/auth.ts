import Service from '@ember/service';
import { inject as service } from '@ember/service';

export default class Auth extends Service {
  @service session;
  login(username: string, password: string) {
    console.log('login service', username, password);
    this.session.authenticate('authenticator:jwt');
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your services.
declare module '@ember/service' {
  interface Registry {
    'auth': Auth;
  }
}
