import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdatePaymentMethodFlowComponent } from './update-payment-method-flow.component';
import { FlowType } from '@app/_models/flow-type.enum';

const routes: Routes = [
  {
    path: '',
    component: UpdatePaymentMethodFlowComponent,
    children: [
      {
        path: '',
        redirectTo: 'verify-id',
        pathMatch: 'full',
      },
      {
        path: 'verify-id',
        loadChildren: () =>
          import('@app/_pages/verify-id-page/verify-id-page.module').then(
            (m) => m.VerifyIdPageModule
          ),
      },
      {
        path: 'enter-sms',
        loadChildren: () =>
          import(
            '@app/_pages/enter-sms-code-page/enter-sms-code-page.module'
          ).then((m) => m.EnterSmsCodeModule),
      },
      {
        path: 'credit-card',
        loadChildren: () =>
          import('@app/_pages/credit-card/credit-card.module').then(
            (m) => m.CreditCardModule
          ),
        data: { flowType: FlowType.paymentMethod },
      },
      {
        path: 'success',
        loadComponent: () =>
          import('../../_pages/success-page/success-page.component').then(
            (x) => x.SuccessPageComponent
          ),
        data: { flowType: FlowType.paymentMethod },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdatePaymentMethodFlowRoutingModule {}
