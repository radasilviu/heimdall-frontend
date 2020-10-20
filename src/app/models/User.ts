import {Role} from './Role';

export interface User {
  token: string;
  username?: string;
  password?: string;
  access_token?: string;
  roles?: Role[];
  loggedIn?: boolean;
  active?:string
  refreshToken:string;

}
