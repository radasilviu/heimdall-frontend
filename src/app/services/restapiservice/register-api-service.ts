import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IUser } from 'src/app/models/User'
import { Env } from 'src/app/configs/env';

const registerUrl = Env.apiRootURL + '/oauth/register';

@Injectable({
    providedIn: 'root'
  })
  
export class RegisterApiService {

  constructor(private http: HttpClient, private _snackBar: MatSnackBar) { }

  openSnackBar(message: string, time: number) {
    this._snackBar.open(message, '', {
      duration: time,
    });
  }

  registerUser(user: IUser){
    const options = {
      headers:{
        whitelist:"true"
      }
    }
    return this.http.post<IUser>( registerUrl , user,options);
  }
}
