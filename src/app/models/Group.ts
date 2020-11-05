import {User} from './User';
import {Realm} from './Realm';

export interface Group{
  name:string
  users:Array<User>
  realm:Realm
}
