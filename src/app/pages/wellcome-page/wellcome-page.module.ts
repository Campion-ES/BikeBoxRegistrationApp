import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { WellcomePageComponent } from './wellcome-page.component';
import { TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { TranslocoRootModule } from '@app/transloco-root.module';
import { PageWrapperComponent } from '@app/components/page-wrapper';

const routes: Routes = [{ path: '', component: WellcomePageComponent }];

@NgModule({
  imports: [
    CommonModule,
    PageWrapperComponent,
    TranslocoRootModule,
    RouterModule.forChild(routes),
  ],
  declarations: [WellcomePageComponent],
  providers: [
    { provide: TRANSLOCO_SCOPE, useValue: 'wellcome-page', multi: true },
  ],
})
export class WellcomePageModule {}
