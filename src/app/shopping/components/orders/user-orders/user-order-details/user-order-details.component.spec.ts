import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserOrderDetailsComponent as UserOrderDetailsComponent } from './user-order-details.component';

describe('DetailsComponent', () => {
  let component: UserOrderDetailsComponent;
  let fixture: ComponentFixture<UserOrderDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserOrderDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserOrderDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
