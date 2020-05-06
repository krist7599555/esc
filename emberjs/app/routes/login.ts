import Route from '@ember/routing/route';

export default class Login extends Route {
  model() {
    return {
      mess: 'some value',
    };
  }
}
// export default class Login extends Route.extend({
//   // anything which *must* be merged to prototype here
// }) {
//   // normal class body definition here
//   didInsertElement() {
//     console.log('inserted', this)
//   }
// }
