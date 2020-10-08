import {TestBed} from '@angular/core/testing';

import {IdentityProviderServiceService} from './identity-provider-service.service';

describe('IdentityProviderServiceService', () => {
  let service: IdentityProviderServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IdentityProviderServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
