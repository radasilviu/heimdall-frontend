import {TestBed} from '@angular/core/testing';

import {AdminAuthService} from './admin-auth.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {MatSnackBarModule} from '@angular/material/snack-bar';

describe('AuthService', () => {
  let service: AdminAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule,
        RouterTestingModule
      ],
    });
    service = TestBed.inject(AdminAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
