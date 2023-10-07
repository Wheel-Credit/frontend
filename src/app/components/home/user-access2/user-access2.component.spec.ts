import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAccess2Component } from './user-access2.component';

describe('UserAccess2Component', () => {
  let component: UserAccess2Component;
  let fixture: ComponentFixture<UserAccess2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAccess2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserAccess2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
