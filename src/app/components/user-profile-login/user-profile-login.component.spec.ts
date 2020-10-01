import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileLoginComponent } from './user-profile-login.component';

describe('UserProfileLoginComponent', () => {
  let component: UserProfileLoginComponent;
  let fixture: ComponentFixture<UserProfileLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserProfileLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
