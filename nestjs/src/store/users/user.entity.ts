export interface User {
  id:        string;
  password:  string;
  nameTH:    string;
  nameEN:    string;
  surnameTH: string;
  surnameEN: string;
  email:     string | string[];
  phone: string | string[];
}
