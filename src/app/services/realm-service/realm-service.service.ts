import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RealmServiceService {
  currentRealm:string;

  setCurrentRealm(currentRealm){
    this.currentRealm = currentRealm;
  }
  getRealm(){
    return this.currentRealm
  }

  constructor() { }
}
