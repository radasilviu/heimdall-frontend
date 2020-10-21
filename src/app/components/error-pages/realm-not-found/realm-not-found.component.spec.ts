import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RealmNotFoundComponent} from './realm-not-found.component';

describe('RealmNotFoundComponent', () => {
  let component: RealmNotFoundComponent;
  let fixture: ComponentFixture<RealmNotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RealmNotFoundComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RealmNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
