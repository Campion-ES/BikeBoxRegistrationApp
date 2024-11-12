import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterFlowComponent } from './register-flow.component';
import { FlowType } from '@app/models';

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
        loadChildren: () =>
          import('@app/pages/register-page').then(
            (m) => m.RegisterPageModule
          ),
      },
      {
        path: 'credit-card',
        loadChildren: () =>
          import('@app/pages/credit-card').then(
            (m) => m.CreditCardModule
          ),
        data: { flowType: FlowType.register },
      },
      {
        path: 'success',
        loadComponent: () =>
          import('../../pages/success-page').then(
            (x) => x.SuccessPageComponent
          ),
        data: { flowType: FlowType.register },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterFlowRoutingModule {}
