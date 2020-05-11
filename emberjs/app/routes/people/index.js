import Route from '@ember/routing/route';

export default class PeopleIndexRoute extends Route {
  model() {
    return this.store.query('person', {})
  }
}
