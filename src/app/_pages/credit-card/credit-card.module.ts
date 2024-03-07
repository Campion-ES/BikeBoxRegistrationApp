import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TextMaskModule } from '@myndmanagement/text-mask';
import { ToKeybModule } from '@app/keyboard/to-keyb/to-keyb.module';
import { RouterModule, Routes } from '@angular/router';
import { CreditCardComponent } from './credit-card.component';
import { PageWrapperComponent } from '@app/_components/page-wrapper/page-wrapper.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TextMaskModule,
    ToKeybModule,
    PageWrapperComponent,
  ],
  declarations: [CreditCardComponent],
})
export class CreditCardModule {}
