import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserViewPopupComponent } from './user-view-popup.component';

describe('UserViewPopupComponent', () => {
  let component: UserViewPopupComponent;
  let fixture: ComponentFixture<UserViewPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserViewPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserViewPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
