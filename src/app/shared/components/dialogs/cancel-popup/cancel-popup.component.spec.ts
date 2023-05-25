import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelPopupComponent } from './cancel-popup.component';

describe('CancelPopupComponent', () => {
  let component: CancelPopupComponent;
  let fixture: ComponentFixture<CancelPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CancelPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CancelPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
