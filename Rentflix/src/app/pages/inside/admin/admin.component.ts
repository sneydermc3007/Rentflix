import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {

  constructor() { }

  openModalProvedores() {
    console.log("Modal Provedores");
  }

  openModalPeliculas() {
    console.log("Modal Peliculas");
  }

  openModalLocales() {
    console.log("Modal Locales");
  }

  openModalHorarios() {
    console.log("Modal Horarios");
  }
}
