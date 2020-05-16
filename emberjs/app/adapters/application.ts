// @ts-ignore
import JSONAPIAdapter from '@ember-data/adapter/json-api';
// import { tracked } from '@glimmer/tracking';
import { inject as service, Registry } from '@ember/service';

export default class ApplicationAdapter extends JSONAPIAdapter {
  // Application specific overrides go here
  @service session: Registry["session"];

  namespace = 'api';
  get headers() {
    const { access_token } = this.session.data.authenticated;
    return access_token ? { Authorization: `Bearer ${access_token}` } : {}
  }
}
