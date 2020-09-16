import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeimdallRolesComponent } from './heimdall-roles.component';

describe('HeimdallRolesComponent', () => {
  let component: HeimdallRolesComponent;
  let fixture: ComponentFixture<HeimdallRolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeimdallRolesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeimdallRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
