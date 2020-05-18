import Route from '@ember/routing/route';
import { inject as service, Registry as Services } from '@ember/service'

export default class Logout extends Route {
  @service toast: Services['toast'];
  @service auth: Services['auth'];

  beforeModel() {
    this.auth.logout()
      .then(() => {
        this.toast.success('logout success');
        this.transitionTo("index")
      })
      .catch((e: any) => {
        console.error(e)
        this.transitionTo("index")
        this.toast.error('logout fail');
      })
  }
}
