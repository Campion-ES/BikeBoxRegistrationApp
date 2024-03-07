import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterFlowRoutingModule } from './register-flow-routing.module';
import { RegisterFlowComponent } from './register-flow.component';

@NgModule({
  declarations: [RegisterFlowComponent],
  imports: [CommonModule, RegisterFlowRoutingModule],
})
export class RegisterFlowModule {}
