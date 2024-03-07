import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TextMaskModule } from '@myndmanagement/text-mask';
import { ToKeybModule } from '@app/keyboard/to-keyb/to-keyb.module';
import { RouterModule, Routes } from '@angular/router';
import { WellcomePageComponent } from './wellcome-page.component';
import { PageWrapperComponent } from '@app/_components/page-wrapper/page-wrapper.component';
import { TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { TranslocoRootModule } from '@app/transloco-root.module';

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
