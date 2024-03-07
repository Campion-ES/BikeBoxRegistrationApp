import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  // { path: 'home', component: HomePageComponent },
  {
    path: 'wellcome',
    loadChildren: () =>
      import('./_pages/wellcome-page/wellcome-page.module').then(
        (m) => m.WellcomePageModule
      ),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./flows/register-flow/register-flow.module').then(
        (m) => m.RegisterFlowModule
      )
  },
  {
    path: 'credit-card',
    loadChildren: () =>
      import('./_pages/credit-card/credit-card.module').then(
        (m) => m.CreditCardModule
      ),
  },
  { path: '', redirectTo: '/wellcome', pathMatch: 'full' },
];

@NgModule({
  imports: [
    //  AccountModule,
    //  UsersModule,
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
