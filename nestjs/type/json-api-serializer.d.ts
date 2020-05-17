// https://www.npmjs.com/package/json-api-serializer

declare module "json-api-serializer" {
  import type { Entity } from '@esc';
  interface SerializeOpt {
    id?: any;
    blacklist?: any[];
    whitelist?: any[];
    jsonapiObject?: any;
    links?: any;
    topLevelMeta?: any;
    topLevelLinks?: any;
    meta?: any;
    relationships?: {
      [attr: string]: {
        type: keyof Entity;
        alternativeKey?: any;
        schema?: any;
        links?: any;
        meta?: any;
        deserialize?: any;
      }
    };
    convertCase?: "kebab-case" | "snake_case" | "camelCase";
    beforeSerialize?(data: any): any;
    unconvertCase?: "kebab-case" | "snake_case" | "camelCase";
    blacklistOnDeserialize?: string[];
    whitelistOnDeserialize?: string[];
    afterDeserialize?(data: any): any;
  }
  class JSONAPISerializer {
    constructor(opts: SerializeOpt);
    serialize     (collection: keyof Entity, data: any, meta?: any): any;
    register      (collection: keyof Entity, conf: SerializeOpt): any;
    deserialize   (collection: keyof Entity, data: any, meta?: any): any;
    serializeError(collection: keyof Entity, data: any): any;
  }
  export = JSONAPISerializer;
}