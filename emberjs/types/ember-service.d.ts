import Service, { inject, Registry } from "../node_modules/@types/ember__service"

declare module "@ember/service" {
  export default Service;
  export { inject, registry };
}
