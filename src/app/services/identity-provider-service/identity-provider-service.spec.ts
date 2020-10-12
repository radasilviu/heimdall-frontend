import {TestBed} from '@angular/core/testing';

import {IdentityProviderService} from './identity-provider-service';

describe('IdentityProviderServiceService', () => {
  let service: IdentityProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IdentityProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
