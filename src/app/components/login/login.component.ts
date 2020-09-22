import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminAuthService} from '../../services/admin-auth/admin-auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { RestApiServiceService } from 'src/app/services/restapiservice/rest-api-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  username;
  password;
  errormessaje= false;
  auth;
  constructor(private authService: AdminAuthService, private router: Router,private service:RestApiServiceService) { }

  ngOnInit(): void {}

  login(): void {
    this.authService
      .login(this.username, this.password)
      .subscribe(
        user => {
         
          const helper = new JwtHelperService();

          const decodedToken = helper.decodeToken(user.access_token);
            this.auth = decodedToken.authorities;
            for(let i in this.auth){
                console.log(this.auth[i].authority)

                if(this.auth[i].authority == "ROLE_ADMIN"){
                  console.log("im auth")
                  this.service.isAuthorized(true);
                }
            }
            console.log(this.service.authorized)
          this.router.navigate(['home']);
        },
        error=>{
          this.errormessaje = true;
        }
      );
  }
}
