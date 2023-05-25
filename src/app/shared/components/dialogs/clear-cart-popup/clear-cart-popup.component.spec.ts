import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClearCartPopupComponent } from './clear-cart-popup.component';

describe('ClearCartPopupComponent', () => {
  let component: ClearCartPopupComponent;
  let fixture: ComponentFixture<ClearCartPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClearCartPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClearCartPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
