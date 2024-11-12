import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerifyIdPageComponent } from './verify-id-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToKeybModule } from '@app/keyboard/to-keyb/to-keyb.module';
import { TranslocoRootModule } from '@app/transloco-root.module';
import { TextMaskModule } from '@myndmanagement/text-mask';
import { TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { RouterModule, Routes } from '@angular/router';
import { ApiErrorMessageComponent } from '@app/components/api-error-message';
import { PageWrapperComponent } from '@app/components/page-wrapper';

const routes: Routes = [{ path: '', component: VerifyIdPageComponent }];

@NgModule({
  declarations: [VerifyIdPageComponent],
  imports: [
    CommonModule,
    TextMaskModule,
    RouterModule.forChild(routes),
    PageWrapperComponent,
    TranslocoRootModule,
    ReactiveFormsModule,
    ToKeybModule,
    ApiErrorMessageComponent,
  ],
  providers: [
    { provide: TRANSLOCO_SCOPE, useValue: 'verify-id-page', multi: true },
  ],
})
export class VerifyIdPageModule {}
