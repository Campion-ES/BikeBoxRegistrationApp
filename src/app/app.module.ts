import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend
import { FakeBackendProvider } from './_helpers';

import { AppRoutingModule } from './app-routing.module';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AppComponent } from './app.component';
import { AlertComponent } from './_components';

import { TextMaskModule } from '@myndmanagement/text-mask';
import { ToKeybModule } from './keyboard/to-keyb/to-keyb.module';
import { HomePageComponent } from './_pages/home-page/home-page.component';
import { TranslocoRootModule } from './transloco-root.module';
import { ActionsPanelomponent } from './_components/actions-panel/actions-panel.component';
import { KeyboardModule } from './keyboard/keyboard.module';
import { provideUserIdleConfig } from 'angular-user-idle';

@NgModule({
  declarations: [AppComponent, AlertComponent, HomePageComponent],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    ToKeybModule,
    TextMaskModule,
    TranslocoRootModule,
    KeyboardModule,
    ActionsPanelomponent,
  ],

  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    // provider used to create fake backend
    FakeBackendProvider,
    provideUserIdleConfig({ idle: 59, timeout: 1, ping:60 }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
