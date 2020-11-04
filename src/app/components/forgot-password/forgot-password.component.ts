import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ForgotPasswordService} from '../../services/forgot-password/forgot-password.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;

  constructor(private forgotPasswordService: ForgotPasswordService, private router: Router, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.forgotPasswordForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }

  submit(): void {
    this.forgotPasswordService
      .sendForgotPasswordEmail(this.forgotPasswordForm.value)
      .subscribe(
        response => {
          this.snackBar.open('Email to reset your password has been sent', '', {
            duration: 3000
          });
          this.router.navigate(['']);
        }
      );
  }
}
