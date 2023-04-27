import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SignInComponent } from './pages/out/sign-in/sign-in.component';
import { SignUpComponent } from './pages/out/sign-up/sign-up.component';

const routes: Routes = [
  { path: '', redirectTo: 'InicioSesion', pathMatch: 'full' },
  { path: 'InicioSesion', component: SignInComponent },
  { path: 'Registro', component: SignUpComponent }

  // Hacer lazy loading de los módulos dentro de la carpeta pages inside
  // { path: '', loadChildren: () => import('.').then(m => m.) }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
