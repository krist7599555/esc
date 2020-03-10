import { prop } from '@typegoose/typegoose';

// prettier-ignore
export class Book {
  @prop({ required: true })                  project:      string;
  @prop({ required: true })                  organization: string;
  @prop({ required: false })                 description:  string;
  @prop({ validate: /^\d{4}-\d{2}-\d{2}$/ }) date:         string;
  @prop({ validate: /^\d+:[30]0$/ })         start:        string;
  @prop({ validate: /^\d+:[30]0$/ })         end:          string;
  @prop({ required: true })                  room:         string;
  @prop({ required: true })                  status:       string;
  @prop({ validate: /^\d{10}$/ })            owner:        string;
  @prop({ validate: /^\d{10}$/ })            editor:       string;
}
