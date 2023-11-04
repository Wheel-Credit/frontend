import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderUnsignedComponent } from './header-unsigned.component';

describe('HeaderUnsignedComponent', () => {
  let component: HeaderUnsignedComponent;
  let fixture: ComponentFixture<HeaderUnsignedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderUnsignedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderUnsignedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
