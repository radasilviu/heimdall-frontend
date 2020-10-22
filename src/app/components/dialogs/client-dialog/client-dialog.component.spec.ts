import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ClientDialogComponent} from './client-dialog.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';

describe('ClientDialogComponent', () => {
  let component: ClientDialogComponent;
  let fixture: ComponentFixture<ClientDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,

        RouterTestingModule
      ],
      declarations: [ClientDialogComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
