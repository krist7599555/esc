// import { r } from 'rethinkdb-ts';

// import * as _thinky from 'thinky';
// console.log('reeethink');
// r.dbCreate('esc_testing');
// const conn = r.connect({
//   db: 'esc_testing',
// });
// const mmm = r.table('mmm');
// console.log(conn);
// conn.then(async con => {
//   await mmm
//     .insert({
//       ok: 'ok',
//       wtf: 'dfghj',
//     })
//     .run(con);
//   console.log('finish');
// });

// var thinky = _thinky({
//   db: 'esc-test',
// });

// var type = thinky.type;

// // Create a model - the table is automatically created
// var Post = thinky.createModel('Post', {
//   id: String,
//   title: String,
//   content: String,
//   idAuthor: String,
// });

// // You can also add constraints on the schema
// var Author = thinky.createModel('Author', {
//   id: type.string(), // a normal string
//   name: type.string().min(2), // a string of at least two characters
//   email: type.string().email(), // a string that is a valid email
// });

// // Join the models
// Post.belongsTo(Author, 'author', 'idAuthor', 'id');

// export interface User extends Document {
//   _id: string;
//   gender?: 'male' | 'female';
//   nameTH: string;
//   surnameTH: string;
//   nameEN: string;
//   surnameEN: string;
//   year: number;
//   faculty: number;
//   email?: string;
//   nickname?: string;
//   role?: string[];
// }
