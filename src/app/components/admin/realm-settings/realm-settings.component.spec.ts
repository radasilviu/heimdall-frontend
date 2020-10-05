import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealmSettingsComponent } from './realm-settings.component';

describe('RealmSettingsComponent', () => {
  let component: RealmSettingsComponent;
  let fixture: ComponentFixture<RealmSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RealmSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RealmSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
