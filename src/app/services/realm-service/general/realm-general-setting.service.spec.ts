import { TestBed } from '@angular/core/testing';

import { RealmGeneralSettingService } from './realm-general-setting.service';

describe('RealmGeneralSettingService', () => {
  let service: RealmGeneralSettingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RealmGeneralSettingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
