import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  private isValid = false;

  setLogedIn(value){
    this.isValid = value;
  }

  get isLoggedIn(){
    return this.isValid
  }

  constructor() { }


 
}
