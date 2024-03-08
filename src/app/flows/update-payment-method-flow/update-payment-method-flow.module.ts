import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UpdatePaymentMethodFlowRoutingModule } from './update-payment-method-flow-routing.module';
import { UpdatePaymentMethodFlowComponent } from './update-payment-method-flow.component';


@NgModule({
  declarations: [
    UpdatePaymentMethodFlowComponent
  ],
  imports: [
    CommonModule,
    UpdatePaymentMethodFlowRoutingModule
  ]
})
export class UpdatePaymentMethodFlowModule { }
