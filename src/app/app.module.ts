import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { NgxSpinnerModule } from 'ngx-spinner';

// Providers
import { AuthGuard } from './helper/auth.guard';
import { BsModalRef, ModalModule } from 'ngx-bootstrap/modal';
import { LocalStorageService } from './shared/providers/local-storage.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Ng5SliderModule } from 'ng5-slider';
import localeFr from '@angular/common/locales/fr';
import { HelperService } from './shared/providers/helper.service';
import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider } from 'angular-6-social-login';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Configs
export function getAuthServiceConfigs() {
  const config = new AuthServiceConfig(
    [{
      id: GoogleLoginProvider.PROVIDER_ID,
      provider: new GoogleLoginProvider(environment.GOOGLE_WEB_CLIENT_ID)
    }]
  );
  return config;
}

registerLocaleData(localeFr);
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: (environment.production) }),
    ModalModule.forRoot(),
    NgxSpinnerModule,
    BrowserAnimationsModule,
    Ng5SliderModule,
    SocialLoginModule,
    PaginationModule.forRoot(),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthGuard,
    BsModalRef,
    LocalStorageService,
    HelperService,
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
