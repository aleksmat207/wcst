import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import localePL from '@angular/common/locales/pl';
import { AppComponent } from './app.component';
import {  CardsComponent } from './cards/cards.component';
import { AppRoutingModule } from './app.routing.module';
import { HttpClientModule } from '../../node_modules/@angular/common/http';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localePL);
@NgModule({
  declarations: [
    AppComponent,
    CardsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserModule
  ],
  providers: [{provide:LOCALE_ID, useValue:'pl'}],
  bootstrap: [AppComponent]
})
export class AppModule {
}