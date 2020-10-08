import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IdentityProviderServiceService {

   google = new BehaviorSubject<boolean>(false)

  setGoogleProvider(google){
    this.google.next(google);
  }
  getGoogleProvider(){
     return this.google
  }

  constructor() { }
}
