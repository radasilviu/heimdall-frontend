import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoleServiceService {
  username;
  id;

  setusername(username){
    this.username = username;
  }
  setId(id){
    this.id = id;
  }

  constructor() { }
}
