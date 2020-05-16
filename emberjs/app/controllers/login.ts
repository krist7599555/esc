import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { Registry as Services } from '@ember/service';

export default class LoginController extends Controller {
  @tracked username = ""
  @tracked password = ""
  @service session!: Services['session'];
  @service toast!: Services['toast'];

  @action
  async login(e: Event) {
    e.preventDefault()
    await this.session.authenticate('authenticator:jwt', this.username, this.password)
      .then(() => {
        this.transitionToRoute("index");
        this.toast.success('login success')
      })
      .catch((errs: any) => {
        console.error(errs);
        for (const err of errs) {
          this.toast.error(err.detail, err.title || err.type || undefined)
          console.error(err)
        }
      })
  }
}