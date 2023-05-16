import { Component } from '@angular/core';
import { AuthService } from 'src/app/pages/out/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [AuthService]
})
export class NavbarComponent {

    public userSession: any = {};
    public tipoUser: string = '';

    constructor(private _auth: AuthService) { }

    ngOnInit(): void {
      this.userSession = this._auth.getUserSession();
      console.log('Usuario de la sesión: ', this.userSession)

      this.tipoUser = this.userSession['Rol']
    }
}
