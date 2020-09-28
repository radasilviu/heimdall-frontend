import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealmLoginSettingComponent } from './realm-login-setting.component';

describe('RealmLoginSettingsComponent', () => {
  let component: RealmLoginSettingComponent;
  let fixture: ComponentFixture<RealmLoginSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RealmLoginSettingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RealmLoginSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
