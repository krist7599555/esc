import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Auth from '../services/auth';

interface LoginArgs {}

export default class Login extends Component<LoginArgs> {

  @tracked username = '';
  @tracked password = '';

  @service auth: Auth;

  @action
  login(e: Event) {
    e.preventDefault();
    this.auth.login(this.username, this.password);
  }
}
