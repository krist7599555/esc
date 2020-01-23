export interface SsoUser {
  uid: string;
  username: string;
  gecos: string;
  email: string;
  disable: boolean;
  roles: Array<string>;
  firstname: string;
  lastname: string;
  firstnameth: string;
  lastnameth: string;
  ouid: string;
}

export interface SsoToken {
  ticket: string;
  type: string;
  content: string;
  AuthInfo: string;
  Valid: number;
}
