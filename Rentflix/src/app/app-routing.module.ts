import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SingComponent } from './pages/out/sign_standalone/sing.component'
import { AuthGuard } from './pages/guard/auth.guard';

const routes: Routes = [

  { path: '', redirectTo: 'Sign', pathMatch: 'full' },
  { path: 'Sign', component: SingComponent },

  // Hacer lazy loading de los módulos dentro de la carpeta pages inside
  { path: 'Inside', loadChildren: () => import('./pages/inside/inside.module').then(m => m.InsideModule), canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'Sign'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
