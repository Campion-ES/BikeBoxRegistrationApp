import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TextMaskModule } from '@myndmanagement/text-mask';
import { ToKeybModule } from '@app/keyboard/to-keyb/to-keyb.module';
import { CreditCardComponent } from './credit-card.component';
import { TranslocoRootModule } from '@app/transloco-root.module';
import { TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { RouterModule, Routes } from '@angular/router';
import { PageWrapperComponent } from '@app/components/page-wrapper';
import { ApiErrorMessageComponent } from '@app/components/api-error-message';

const routes: Routes = [{ path: '', component: CreditCardComponent }];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    TextMaskModule,
    ToKeybModule,
    PageWrapperComponent,
    TranslocoRootModule,
    ApiErrorMessageComponent,
  ],
  declarations: [CreditCardComponent],
  providers: [
    { provide: TRANSLOCO_SCOPE, useValue: 'credit-card-page', multi: true },
  ],
})
export class CreditCardModule {}
