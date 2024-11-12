import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'wellcome',
    loadChildren: () =>
      import('./pages/wellcome-page').then((m) => m.WellcomePageModule),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./flows/register-flow/register-flow.module').then(
        (m) => m.RegisterFlowModule
      ),
  },
  {
    path: 'payment-method',
    loadChildren: () =>
      import(
        './flows/update-payment-method-flow/update-payment-method-flow.module'
      ).then((m) => m.UpdatePaymentMethodFlowModule),
  },
  { path: '', redirectTo: '/wellcome', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
