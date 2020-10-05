import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealmGeneralSettingComponent } from './realm-general-setting.component';

describe('GeneralComponent', () => {
  let component: RealmGeneralSettingComponent;
  let fixture: ComponentFixture<RealmGeneralSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RealmGeneralSettingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RealmGeneralSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
