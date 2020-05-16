// import * as EmberSimpleAuthSession from 'ember-simple-auth/addon/services/session';
interface AuthSession {
  isAuthenticated: any;
  data: any;
  store: any;
  attemptedTransition: any;
  init(): any;
  set(key: any, value: any): any;
  authenticate(... args: any[]): Promise<any>;
  invalidate(): any;
}
declare module '@ember/service' {
  interface Registry {
    session: AuthSession;
  }
}
