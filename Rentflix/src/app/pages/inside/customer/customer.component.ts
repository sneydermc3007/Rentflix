import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalInfoComponent } from './components/modal-info/modal-info.component';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  public Peliculas: any[] = [
    {
      nombre: 'El Padrino',
      duracion: '175',
      precio: 9.99,
      descripcion: 'Un jefe de la mafia intenta transferir el control de su imperio criminal a su hijo.',
      imagen: 'https://www.themoviedb.org/t/p/w220_and_h330_face/ApiEfzSkrqS4m1L5a2GwWXzIiAs.jpg',
      stock: 5,
      provedor: 'Amazon Prime',
      categorias: [
        'Drama', 'Crimen', 'Clásico', 'Suspense', 'Película de culto'
      ]
    },
    {
      nombre: 'Avengers: La era de Ultrón',
      duracion: '141',
      precio: 7.99,
      descripcion: `Los Vengadores se reúnen de nuevo y juntan sus fuerzas con las de los recién llegados Quicksilver y Bruja Escarlata
                    para luchar contra un robot maquiavélico llamado Ultrón, el cual Tony Stark creó con el fin de defender la paz, pero
                    resultó defectuoso y ahora pretende exterminar a toda la humanidad.`,
      imagen: 'https://lumiere-a.akamaihd.net/v1/images/the_avengers_2012_poster_july_disney_plus_drops_d4bd9c6e.png',
      stock: 0,
      provedor: 'Disney Plus',
      categorias: [
        'Acción', 'Aventura', 'Ciencia ficción', 'Fantasía', 'Película de culto'
      ]
    }
  ];

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
    console.log("Peliculas: ", this.Peliculas);
  }

  openModal(nombreMovie: string) {
    console.log("Modal ", nombreMovie);
    const modalRef = this.modalService.open(ModalInfoComponent);
    modalRef.componentInstance.data = this.Peliculas.find(x => x.nombre === nombreMovie);
  }
}
