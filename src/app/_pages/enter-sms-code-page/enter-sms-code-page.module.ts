import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PageWrapperComponent } from '@app/_components/page-wrapper/page-wrapper.component';
import { ToKeybModule } from '@app/keyboard/to-keyb/to-keyb.module';
import { TranslocoRootModule } from '@app/transloco-root.module';
import { TextMaskModule } from '@myndmanagement/text-mask';
import { TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { RouterModule, Routes } from '@angular/router';
import { EnterSmsCodeComponent } from './enter-sms-code-page.component';

const routes: Routes = [{ path: '', component: EnterSmsCodeComponent }];

@NgModule({
  declarations: [EnterSmsCodeComponent],
  imports: [
    CommonModule,
    TextMaskModule,
    RouterModule.forChild(routes),
    PageWrapperComponent,
    TranslocoRootModule,
    ReactiveFormsModule,
    ToKeybModule,
  ],
  providers: [
    { provide: TRANSLOCO_SCOPE, useValue: 'sms-code-page', multi: true },
  ],
})
export class EnterSmsCodeModule {}
