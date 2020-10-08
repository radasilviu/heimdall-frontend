import {TestBed} from '@angular/core/testing';

import {RestApiServiceService} from './rest-api-service.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {MatSnackBarModule} from '@angular/material/snack-bar';

describe('RestApiServiceService', () => {
  let service: RestApiServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MatSnackBarModule
      ],
    });
    service = TestBed.inject(RestApiServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
