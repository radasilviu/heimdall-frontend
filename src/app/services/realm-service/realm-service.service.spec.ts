import {TestBed} from '@angular/core/testing';

import {RealmServiceService} from './realm-service.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {MatSnackBarModule} from '@angular/material/snack-bar';

describe('RealmServiceService', () => {
  let service: RealmServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MatSnackBarModule
      ],
    });
    service = TestBed.inject(RealmServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
