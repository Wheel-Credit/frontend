import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MaterialModule } from '../shared/material.module';
import { HttpClientModule } from '@angular/common/http';
import { UserAccessComponent } from './components/home/user-access/user-access.component';
import { HomeComponent } from './views/home/home.component';
import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component';
import { UserAccessViewComponent } from './views/user-access-view/user-access-view.component';
import { UserAccess2Component } from './components/home/user-access2/user-access2.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { HeaderComponent } from './components/shared/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    UserAccessComponent,
    HomeComponent,
    PageNotFoundComponent,
    UserAccessViewComponent,
    UserAccess2Component,
    FooterComponent,
    HeaderComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, MaterialModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
