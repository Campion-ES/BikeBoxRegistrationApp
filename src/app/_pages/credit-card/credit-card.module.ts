import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TextMaskModule } from '@myndmanagement/text-mask';
import { ToKeybModule } from '@app/keyboard/to-keyb/to-keyb.module';
import { CreditCardComponent } from './credit-card.component';
import { PageWrapperComponent } from '@app/_components/page-wrapper/page-wrapper.component';
import { TranslocoRootModule } from '@app/transloco-root.module';
import { TRANSLOCO_SCOPE } from '@ngneat/transloco';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TextMaskModule,
    ToKeybModule,
    PageWrapperComponent,
    TranslocoRootModule,
  ],
  declarations: [CreditCardComponent],
  providers: [
    { provide: TRANSLOCO_SCOPE, useValue: 'credit-card-page', multi: true },
  ],
})
export class CreditCardModule {}
