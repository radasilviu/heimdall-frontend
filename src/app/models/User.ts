import { IRole } from './Role';

export interface IUser {
    username?: string;
    password?: string;
    access_token?: string;
    roles?: IRole[];
}
