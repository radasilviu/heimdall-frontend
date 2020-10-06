import { TestBed } from '@angular/core/testing';

import { ClientLoginService } from './client-login.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';

describe('ClientServiceService', () => {
  let service: ClientLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MatSnackBarModule
      ],
    });
    service = TestBed.inject(ClientLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
