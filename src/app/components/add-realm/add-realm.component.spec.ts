import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRealmComponent } from './add-realm.component';

describe('AddRealmComponent', () => {
  let component: AddRealmComponent;
  let fixture: ComponentFixture<AddRealmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRealmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRealmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
