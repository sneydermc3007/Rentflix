import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

// Modales
import { ProvedoresComponent } from './components/provedores/provedores.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {

  constructor(private modalService: NgbModal) { }

  openModalProvedores() {
    console.log("Modal Provedores");
    this.modalService.open(ProvedoresComponent, { size: 'xl', centered: true });
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
