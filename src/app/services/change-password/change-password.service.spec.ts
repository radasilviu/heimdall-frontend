import { TestBed } from '@angular/core/testing';

import { ChangePasswordService } from './change-password.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';

describe('ChangePasswordService', () => {
  let service: ChangePasswordService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MatSnackBarModule
      ],
    });
    service = TestBed.inject(ChangePasswordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
