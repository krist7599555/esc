import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class LoginController extends Controller {
  @tracked username = ""
  @tracked password = ""
  @service session;
  @service toast;

  @action
  async login(e) {
    e.preventDefault()
    await this.session.authenticate('authenticator:jwt', this.username, this.password)
      .then(() => {
        this.transitionToRoute("index");
        this.toast.success('login success')
      })
      .catch(errs => {

        for (const err of errs) {
          this.toast.error(err.detail, err.title || err.type || undefined)
          console.error(err)
        }
      })
  }
}
