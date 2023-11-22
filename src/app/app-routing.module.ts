import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserAccessViewComponent } from './views/user-access-view/user-access-view.component';
import { HomeComponent } from './views/home/home.component';
import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component';
import { PaymentFormViewComponent } from './views/payment-form-view/payment-form-view.component';
import { PaymentHistoryViewComponent } from './views/payment-history-view/payment-history-view.component';
import { CatalogViewComponent } from './views/catalog-view/catalog-view.component';
import { ProfileViewComponent } from './views/profile-view/profile-view.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'auth', component: UserAccessViewComponent },
  { path: 'form', component: PaymentFormViewComponent },
  { path: 'history', component: PaymentHistoryViewComponent },
  { path: 'catalog', component: CatalogViewComponent },
  { path: 'profile', component: ProfileViewComponent},
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
