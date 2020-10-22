import {TestBed} from '@angular/core/testing';

import {RealmService} from './realm-service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {MatSnackBarModule} from '@angular/material/snack-bar';

describe('RealmService', () => {
  let service: RealmService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MatSnackBarModule
      ],
    });
    service = TestBed.inject(RealmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
