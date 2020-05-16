import Route from '@ember/routing/route';

interface PeopleShowParams {
  person_id: string;
}

export default class PeopleShow extends Route {
  async model(param: PeopleShowParams) {
    const person = this.store.findRecord('person', param.person_id);
    return {
      person
    }
  }
}
