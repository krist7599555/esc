import EmberRouter from '@ember/routing/router';
import config from './config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function() {
  this.route('login');
  this.route('people',  function() {
    this.route('index', { path: '/' });
    this.route('show', { path: '/:person_id' });
  });

  this.route('rooms',  function() {
    this.route('index', { path: '/' });
    this.route('show', { path: '/:room_id' });
    this.route('new');
  });
});
