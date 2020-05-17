import Service from '@ember/service';
import { inject as service, Registry as Services } from "@ember/service"
import { computed, action } from "@ember/object"
import RSVP from 'rsvp';


export default class Auth extends Service {
  @service session: Services["session"];

  @computed('session.isAuthenticated')
  get is_auth() {
    return this.session.isAuthenticated;
  }

  @computed('session.data.authenticated.id')
  get id() {
    return this.session.data.authenticated.id;
  }

  @action
  login(username: string, password: string): RSVP.Promise<any> {
    return this.session.authenticate('authenticator:jwt', username, password)
  }

  @action
  logout(): RSVP.Promise<any> {
    return this.session.invalidate();
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your services.
declare module '@ember/service' {
  interface Registry {
    'auth': Auth;
  }
}
