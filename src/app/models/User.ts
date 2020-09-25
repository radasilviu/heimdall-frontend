import { Role } from './Role';

export interface User {
  username:string
  password:string
  access_token: string;
  roles :Role[]
}
