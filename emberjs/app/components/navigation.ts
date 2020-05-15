import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { toLeft, toRight } from 'ember-animated/transitions/move-over';

// interface NavigationArgs {}

// export default class Navigation extends Component<NavigationArgs> {}
export default class Navigation extends Component {
  @service session;
  @service toast;
  @action
  async logout() {
    this.session.invalidate().then(() => {
      this.toast.success('logout success')
    })
  }
  rules({ newItems }) {
    if (newItems[0]) {
      return toRight;
    } else {
      return toLeft;
    }
  }
}
