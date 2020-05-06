import EmberRouter from '@ember/routing/router';
import config from './config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function() {
  this.route('rooms', function() {
    this.route('create');
    this.route('show');
  });
  this.route('login');
  this.route('profile');
  this.route('users', function() {
    this.route('show');
    this.route('edit');
  });
});
