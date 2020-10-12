import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileLoginComponent } from './user-profile-login.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';

describe('UserProfileLoginComponent', () => {
  let component: UserProfileLoginComponent;
  let fixture: ComponentFixture<UserProfileLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule,
        RouterTestingModule
      ],
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
