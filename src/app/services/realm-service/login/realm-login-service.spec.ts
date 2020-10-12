import {TestBed} from '@angular/core/testing';

import {RealmLoginService} from './realm-login-service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {MatSnackBarModule} from '@angular/material/snack-bar';

describe('RealmLoginServiceService', () => {
  let service: RealmLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({

      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MatSnackBarModule
      ],
    });
    service = TestBed.inject(RealmLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
