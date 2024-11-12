import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TextMaskModule } from '@myndmanagement/text-mask';
import { ToKeybModule } from './keyboard/to-keyb/to-keyb.module';
import { TranslocoRootModule } from './transloco-root.module';
import { KeyboardModule } from './keyboard/keyboard/keyboard.module';
import { provideUserIdleConfig } from 'angular-user-idle';
import { ActionsPanelomponent } from './components/actions-panel/actions-panel.component';
import { AlertComponent } from './components/alert-componnet';
import { ConfigService } from './services';

export function initializeApp(configService: ConfigService) {
  return () => configService.loadConfig().toPromise();
}

@NgModule({
  declarations: [AppComponent],
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
    AlertComponent,
  ],

  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [ConfigService],
      multi: true
    },
    provideUserIdleConfig({ idle: 59, timeout: 1, ping: 60 })
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
