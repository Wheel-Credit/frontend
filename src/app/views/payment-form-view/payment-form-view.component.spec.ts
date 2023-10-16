import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentFormViewComponent } from './payment-form-view.component';

describe('PaymentFormViewComponent', () => {
  let component: PaymentFormViewComponent;
  let fixture: ComponentFixture<PaymentFormViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentFormViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentFormViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
