import { TestBed } from '@angular/core/testing';

import { RealmLoginServiceService } from './realm-login-service.service';

describe('RealmLoginServiceService', () => {
  let service: RealmLoginServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RealmLoginServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
