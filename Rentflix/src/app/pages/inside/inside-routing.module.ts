import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { SellerComponent } from './seller/seller.component';
import { CustomerComponent } from './customer/customer.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: 'administrador', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule), component: AdminComponent },
      { path: 'vendedor', loadChildren: () => import('./seller/seller.module').then(m => m.SellerModule), component: SellerComponent },
      { path: 'cliente', loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule), component: CustomerComponent },
    ]
  },
  { path: '**', redirectTo: '' }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InsideRoutingModule { }
