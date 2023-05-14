import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../out/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent  implements OnInit{

  public userSession: any = {}

  constructor(private _auth: AuthService) { }

  ngOnInit(): void {
    this.userSession = this._auth.getUserSession();
    // console.log('Usuario de la sesión: ', this.userSession)
  }


}
