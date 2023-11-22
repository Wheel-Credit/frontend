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
import { FooterComponent } from './components/shared/footer/footer.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { HomePageComponent } from './components/home/home-page/home-page.component';
import { PaymentFormViewComponent } from './views/payment-form-view/payment-form-view.component';
import { PaymentHistoryViewComponent } from './views/payment-history-view/payment-history-view.component';
import { FinanceFormComponent } from './components/form/finance-form/finance-form.component';
import { HeaderUnsignedComponent } from './components/shared/header-unsigned/header-unsigned.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TableComponent } from './components/form/table/table.component';
import { ListComponent } from './components/history/list/list.component';
import { DocumentationComponent } from './components/home/documentation/documentation.component';
import { SavedTableComponent } from './components/history/saved-table/saved-table.component';
import { CatalogViewComponent } from './views/catalog-view/catalog-view.component';
import { CatalogListComponent } from './components/catalog/catalog-list/catalog-list.component';
import { CatalogTableComponent } from './components/catalog/catalog-table/catalog-table.component';
import { CurrencyPipe } from '@angular/common';
import { ProfileViewComponent } from './views/profile-view/profile-view.component';
import { ProfileComponentComponent } from './components/profile/profile-component/profile-component.component';
import { ProfileEditComponentComponent } from './components/profile/profile-edit-component/profile-edit-component.component';

@NgModule({
  declarations: [
    AppComponent,
    UserAccessComponent,
    HomeComponent,
    PageNotFoundComponent,
    UserAccessViewComponent,
    FooterComponent,
    HeaderComponent,
    HomePageComponent,
    PaymentFormViewComponent,
    PaymentHistoryViewComponent,
    FinanceFormComponent,
    HeaderUnsignedComponent,
    TableComponent,
    ListComponent,
    DocumentationComponent,
    SavedTableComponent,
    CatalogViewComponent,
    CatalogListComponent,
    CatalogTableComponent,
    ProfileViewComponent,
    ProfileComponentComponent,
    ProfileEditComponentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    NgbModule,
  ],
  providers: [CurrencyPipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
