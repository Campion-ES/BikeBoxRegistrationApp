import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TextMaskModule } from '@myndmanagement/text-mask';
import { ToKeybModule } from '@app/keyboard/to-keyb/to-keyb.module';
import { RegisterPageComponent } from './register-page.component';
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
  declarations: [RegisterPageComponent],
  providers: [{ provide: TRANSLOCO_SCOPE, useValue: 'register-page', multi:true }],
})
export class RegisterPageModule {}
