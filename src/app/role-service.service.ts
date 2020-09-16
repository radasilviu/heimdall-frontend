import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoleServiceService {

  username;

  setusername(username){
    this.username = username;
  }

  constructor() { }
}
