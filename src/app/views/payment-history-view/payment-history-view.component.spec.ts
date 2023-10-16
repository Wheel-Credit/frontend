import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentHistoryViewComponent } from './payment-history-view.component';

describe('PaymentHistoryViewComponent', () => {
  let component: PaymentHistoryViewComponent;
  let fixture: ComponentFixture<PaymentHistoryViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentHistoryViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentHistoryViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
