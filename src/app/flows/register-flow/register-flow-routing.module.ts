import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreditCardComponent } from '@app/_pages/credit-card/credit-card.component';
import { CreditCardModule } from '@app/_pages/credit-card/credit-card.module';
import { RegisterPageComponent } from '@app/_pages/register-page/register-page.component';
import { RegisterPageModule } from '@app/_pages/register-page/register-page.module';
import { RegisterFlowComponent } from './register-flow.component';
import { FlowType } from '@app/_models/flow-type.enum';

const routes: Routes = [
  {
    path: '',
    component: RegisterFlowComponent,
    children: [
      {
        path: '',
        redirectTo: 'form',
        pathMatch: 'full',
      },
      {
        path: 'form',
        component: RegisterPageComponent,
      },
      {
        path: 'credit-card',
        component: CreditCardComponent,
        data: { flowType: FlowType.register },
      },
      {
        path: 'success',
        loadComponent: () =>
          import('../../_pages/success-page/success-page.component').then(
            (x) => x.SuccessPageComponent
          ),
        data: { flowType: FlowType.register },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, RegisterPageModule, CreditCardModule],
})
export class RegisterFlowRoutingModule {}
