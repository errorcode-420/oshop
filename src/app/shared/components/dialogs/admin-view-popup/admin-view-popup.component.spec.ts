import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminViewPopupComponent } from './admin-view-popup.component';

describe('AdminViewPopupComponent', () => {
  let component: AdminViewPopupComponent;
  let fixture: ComponentFixture<AdminViewPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminViewPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminViewPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
