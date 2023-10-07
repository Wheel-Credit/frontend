import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAccessViewComponent } from './user-access-view.component';

describe('UserAccessViewComponent', () => {
  let component: UserAccessViewComponent;
  let fixture: ComponentFixture<UserAccessViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAccessViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserAccessViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
