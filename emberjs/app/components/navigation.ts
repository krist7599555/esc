import Component from '@glimmer/component';
import { inject as service, Registry as Services } from '@ember/service';
import { action } from '@ember/object';
import { toLeft, toRight } from 'ember-animated/transitions/move-over';

export default class Navigation extends Component {
  @service auth: Services["auth"];
  @service toast: Services["toast"];
  @action
  async logout() {
    this.auth.logout().then(() => {
      this.toast.success('logout success')
    })
  }
  rules({ newItems }: any) {
    if (newItems[0]) {
      return toRight;
    } else {
      return toLeft;
    }
  }
}
