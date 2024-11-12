import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdatePaymentMethodFlowComponent } from './update-payment-method-flow.component';
import { FlowType } from '@app/models';

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
          import('@app/pages/verify-id-page').then(
            (m) => m.VerifyIdPageModule
          ),
      },
      {
        path: 'enter-sms',
        loadChildren: () =>
          import(
            '@app/pages/enter-sms-code-page'
          ).then((m) => m.EnterSmsCodeModule),
      },
      {
        path: 'credit-card',
        loadChildren: () =>
          import('@app/pages/credit-card').then(
            (m) => m.CreditCardModule
          ),
        data: { flowType: FlowType.paymentMethod },
      },
      {
        path: 'success',
        loadComponent: () =>
          import('../../pages/success-page').then(
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
