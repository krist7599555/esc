import RSVP from "rsvp";

interface SessionService {
  /**
    @ref /node_modules/ember-simple-auth/addon/services/session.js
    @event authenticationSucceeded
    @event invalidationSucceeded
  */

  readonly isAuthenticated: boolean;
  readonly data: { authenticated: any };

  store: any | null; // BaseStore computed.oneWay('session.store'),
  attemptedTransition: any | null;// Transition computed.alias('session.attemptedTransition'),


  set(key: string, value: any): any;
  authenticate(authenticater: string, ...args: any[]): RSVP.Promise;
  invalidate(...rest: any[]): RSVP.Promise;
};


declare module '@ember/service' {
  interface Registry {
    session: SessionService;
  }
}

