import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class LoginController extends Controller {
  @tracked username = ""
  @tracked password = ""
  @service session;

  @action
  async login(e) {
    e.preventDefault()
    await this.session.authenticate('authenticator:jwt', this.username, this.password)
    console.log(this.session.isAuthenticated)
  }
}
