import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatabaseTestComponent } from './database-test.component';

describe('DatabaseTestComponent', () => {
  let component: DatabaseTestComponent;
  let fixture: ComponentFixture<DatabaseTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatabaseTestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatabaseTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
