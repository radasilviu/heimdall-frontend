import { TestBed } from '@angular/core/testing';

import { RealmServiceService } from './realm-service.service';

describe('RealmServiceService', () => {
  let service: RealmServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RealmServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
