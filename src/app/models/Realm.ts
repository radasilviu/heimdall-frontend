import {User} from './User';
import {Client} from './Client';
import {Role} from './Role';
import {Group} from './Group';

export interface Realm {
  name: string;
  displayName: string;
  enabled: boolean;
  userRegistration: boolean;
  editUsername: boolean;
  forgotPassword: boolean;
  rememberMe: boolean;
  verifyEmail: boolean;
  loginWithEmail: boolean;
}

export interface ParentRealm{
  users:User[]
  clients:Client[]
  roles:Role[]
  groups:Group[]
  realm:Realm
}
