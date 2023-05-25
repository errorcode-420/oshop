import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteOrderPopupComponent } from './delete-order-popup.component';

describe('DeleteOrderPopupComponent', () => {
  let component: DeleteOrderPopupComponent;
  let fixture: ComponentFixture<DeleteOrderPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteOrderPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteOrderPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
