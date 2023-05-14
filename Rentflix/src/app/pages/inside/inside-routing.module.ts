import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';

import { AdminComponent } from './admin/admin.component';
import { GraficasComponent } from './admin/components/graficas/graficas.component'

import { SellerComponent } from './seller/seller.component';

import { CustomerComponent } from './customer/customer.component';
import { CitasComponent } from './customer/components/citas/citas.component';

import { TypeUserGuard } from '../guard/type-user.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivateChild: [TypeUserGuard],
    children: [
      { path: 'administrador', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule), component: AdminComponent },
      { path: 'vendedor', loadChildren: () => import('./seller/seller.module').then(m => m.SellerModule), component: SellerComponent },
      { path: 'cliente', loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule), component: CustomerComponent },

      // Rutas secundarias
      { path: 'cliente/citas', loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule), component: CitasComponent },
      { path: 'administrador/informes', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule), component: GraficasComponent }
    ]
  },
  { path: '**', redirectTo: '' }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InsideRoutingModule { }
