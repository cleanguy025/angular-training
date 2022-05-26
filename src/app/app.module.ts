import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {AccountService} from './core/services/account.service';
import {HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { APP_HTTP_INTERCEPTORS_PROVIDER } from './core/services/http-interceptors/app-http-interceptor.provider';
import { SharedModule } from './commons/share-modules/shared.module';
import { TranslocoRootModule } from './core/transloco-translation/transloco-root.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule,
    TranslocoRootModule
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  providers: [
    // provider used to create fake backend,
    AccountService,
    APP_HTTP_INTERCEPTORS_PROVIDER
  ]
})
export class AppModule {
}
