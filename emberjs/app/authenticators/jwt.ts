import Base from 'ember-simple-auth/authenticators/base';

export default class CustomAuthenticator extends Base {
  restore(data) {
    console.log('CustomAuthenticator -> restore -> data', data);

  }
  authenticate(options) {
    console.log('CustomAuthenticator -> authenticate -> options', options);

  }
  invalidate(data) {
    console.log('CustomAuthenticator -> invalidate -> data', data);
  }
}
