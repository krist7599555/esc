import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { Registry as Services } from '@ember/service';
import { JsonApiResponse } from 'emberjs/services/axios';

export default class LoginController extends Controller {
  @tracked username = ""
  @tracked password = ""
  @service auth: Services['auth'];
  @service toast: Services['toast'];

  @action
  async login(e: Event) {
    e.preventDefault()
    await this.auth.login(this.username, this.password)
      .then(() => {
        this.transitionToRoute("index");
        this.toast.success('login success')
      })
      .catch((o: JsonApiResponse) => {
        for (const err of o.errors) {
          this.toast.error(err.detail, err.title || undefined)
          console.error(err)
        }
      })
  }
}
