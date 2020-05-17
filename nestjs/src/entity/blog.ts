import { r } from 'rethinkdb-ts'
import { IsString } from 'class-validator';

export class Blog {
  @IsString() id: string;
  @IsString() title: string;
  @IsString() markdown: string;
  @IsString() author: string;
  created: Date;
  updated: Date;
}

export const Blogs = r.table<Blog>('blogs');

declare module "@esc" {
  interface Entity {
    blogs: Blog
  }
}
