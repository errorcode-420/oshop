import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryDateComponent } from './delivery-date.component';

describe('DeliveryDateComponent', () => {
  let component: DeliveryDateComponent;
  let fixture: ComponentFixture<DeliveryDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliveryDateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliveryDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
