import {TestBed} from '@angular/core/testing';

import {RealmGeneralSettingService} from './realm-general-setting.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {MatSnackBarModule} from '@angular/material/snack-bar';

describe('RealmGeneralSettingService', () => {
  let service: RealmGeneralSettingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MatSnackBarModule
      ],
    });
    service = TestBed.inject(RealmGeneralSettingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
