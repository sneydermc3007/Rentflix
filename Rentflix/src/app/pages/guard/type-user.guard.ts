import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../out/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TypeUserGuard implements CanActivateChild {
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const currentUserType = this._auth.getUserSession().Rol;

    if(currentUserType === 'Administrador' &&  state.url.startsWith('/Inside/administrador')) {
      return true;
    } else if(currentUserType === 'Vendedor' &&  state.url.startsWith('/Inside/vendedor')) {
      return true;
    } else if (currentUserType === 'Usuario' &&  state.url === '/Inside/cliente') {
      return true;
    }

    // Si no es ninguno de los anteriores, redirigir a la página de inicio
    this.router.navigate(['/Inside']);

    setTimeout(() => {
      alert('No tienes permisos para acceder a esa página');
    }, 1000);

    console.error('No tienes permisos para acceder a esta página');
    return false
  }

  constructor(private router: Router, private _auth: AuthService) {}
}
