import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePaymentMethodFlowComponent } from './update-payment-method-flow.component';

describe('UpdatePaymentMethodFlowComponent', () => {
  let component: UpdatePaymentMethodFlowComponent;
  let fixture: ComponentFixture<UpdatePaymentMethodFlowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdatePaymentMethodFlowComponent]
    });
    fixture = TestBed.createComponent(UpdatePaymentMethodFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
