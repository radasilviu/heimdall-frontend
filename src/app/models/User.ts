import { IRole } from './Role';
 
export interface IUser {
 username?: string;
 password?: string;
 access_token?: string;
 roles?: IRole[];
}
export class User implements IUser {
 public constructor(
 public username?: string,
 public password?: string,
 public email?: string,
 public access_token?: string,
 public roles?: IRole[],
 public isActivated?: Boolean
 ) {}
 
 setUsername(username) {
 this.username = username;
 }
 setUsernameAndPassword(username, password) {
 this.username = username;
 this.password = password;
 }
}