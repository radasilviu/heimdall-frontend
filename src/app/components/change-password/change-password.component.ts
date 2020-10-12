import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ChangePasswordService} from '../../services/change-password-service/change-password.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  changePasswordForm: FormGroup;

  constructor(private changePasswordService: ChangePasswordService, private router: Router, private snackBar: MatSnackBar,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.changePasswordForm = new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  submit(): void {
    const email = this.route.snapshot.queryParamMap.get('email');
    const forgotPasswordCode = this.route.snapshot.queryParamMap.get('forgotPasswordCode');

    this.changePasswordService
      .changePassword(this.changePasswordForm.value, email, forgotPasswordCode)
      .subscribe(
        response => {
          this.snackBar.open('Password changed', '', {
            duration: 3000
          });
          this.router.navigate(['']);
        }
      );
  }
}
