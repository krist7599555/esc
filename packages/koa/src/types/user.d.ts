export interface User {
  ticket: string;
  ouid: string;

  titleTH?: string;
  titleEN?: string;
  nameTH: string;
  nameEN: string;
  surnameTH: string;
  surnameEN: string;

  facultyNUM: number;
  facultyTH: string;
  facultyEN: string;
  facultyABBR: string;
  year: number;
}
