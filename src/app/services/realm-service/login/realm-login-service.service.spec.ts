import { TestBed } from '@angular/core/testing';

import { RealmLoginServiceService } from './realm-login-service.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';

describe('RealmLoginServiceService', () => {
  let service: RealmLoginServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({

      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MatSnackBarModule
      ],
    });
    service = TestBed.inject(RealmLoginServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
