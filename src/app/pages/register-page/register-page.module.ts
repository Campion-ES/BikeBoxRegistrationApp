import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TextMaskModule } from '@myndmanagement/text-mask';
import { ToKeybModule } from '@app/keyboard/to-keyb/to-keyb.module';
import { RegisterPageComponent } from './register-page.component';
import { TranslocoRootModule } from '@app/transloco-root.module';
import { TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { RouterModule, Routes } from '@angular/router';
import { ApiErrorMessageComponent } from '@app/components/api-error-message';
import { PageWrapperComponent } from '@app/components/page-wrapper';
import { PrivacyPolicyModalComponent } from '@app/components/privacy-policy-modal';
import { TermsAndConditionsModalComponent } from '@app/components/terms-and-conditions-modal';

const routes: Routes = [{ path: '', component: RegisterPageComponent }];

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
    PrivacyPolicyModalComponent,
    TermsAndConditionsModalComponent,
  ],
  declarations: [RegisterPageComponent],
  providers: [
    { provide: TRANSLOCO_SCOPE, useValue: 'register-page', multi: true },
  ],
})
export class RegisterPageModule {}
