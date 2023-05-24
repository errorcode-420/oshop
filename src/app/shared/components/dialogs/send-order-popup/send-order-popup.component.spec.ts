import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendOrderPopupComponent } from './send-order-popup.component';

describe('SendOrderPopupComponent', () => {
  let component: SendOrderPopupComponent;
  let fixture: ComponentFixture<SendOrderPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendOrderPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SendOrderPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
