import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.scss']
})
export class CitasComponent  implements OnInit {

  public listLocation = [
    { id: 1, value: 'Norte', label: 'Norte' },
    { id: 2, value: 'Sur', label: 'Sur' },
    { id: 3, value: 'Este', label: 'Este' },
    { id: 4, value: 'Oeste', label: 'Oeste' },
  ];
  public selectLocationValue: any;

  public reservationUser = [
    { local: 'Norte', pelicula: 'Prueba 1', date: '2021-05-01', hour: '10:00' },
    { local: 'Sur', pelicula: 'Prueba 2', date: '2021-05-02', hour: '11:00' },
    { local: 'Norte', pelicula: 'Prueba 3', date: '2021-05-03', hour: '12:00' },
  ]

  public selectMovieValue: any;
  public fieldDate: string = '';
  public fieldHour: string = '';

  public data: any[] = new Array();
  public peliculasDisponible: any[] = [];

    constructor(private _movies: MoviesService) { }

    ngOnInit(): void {
      console.log('CitasComponent');
      this.data = this.reservationUser;

      this._movies.getMovies().subscribe(
        (data) => {
          console.log('Peliculas disponibles: ', data);
          data.map((x: any, index: number) => {
            this.peliculasDisponible.push({
              id: index,
              value: x.NomPelicula,
              label: x.NomPelicula
            })
          })

          console.log('Peliculas: ', this.peliculasDisponible);
        },
        (error) => {
          console.error('Error al obtener las películas: ', error);
        }
      );
    }

    registrarCita() {

      console.log(this.fieldHour)

      this.data.push({
        local: this.selectLocationValue,
        pelicula: this.selectMovieValue,
        date: this.fieldDate,
        hour: this.fieldHour
      })
      this.selectLocationValue = '';
      this.selectMovieValue = '';
      this.fieldDate = '';
      this.fieldHour = '';
    }
}
