import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PrivilegesDialogComponent} from './privileges-dialog.component';

describe('ResourceDialogComponent', () => {
  let component: PrivilegesDialogComponent;
  let fixture: ComponentFixture<PrivilegesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PrivilegesDialogComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivilegesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
