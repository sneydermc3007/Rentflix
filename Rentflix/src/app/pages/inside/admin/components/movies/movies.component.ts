import { Component, Input, OnInit } from '@angular/core';
import { MoviesService } from '../../../customer/services/movies.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  public changeView: boolean = false;
  public ListaPeliculas: any[] = [];

  constructor(private _movie: MoviesService, private modalService: NgbModal, public activeModal: NgbActiveModal) { }

  fieldName: string = '';
  fieldDuration: string = '';
  fieldStock: string = '';
  fieldSupplier: string = '';
  fieldPoster: string = '';
  fieldDescription: string = '';
  fieldCategorias: string = '';
  fieldPrice: string = '';


  ngOnInit() {
    // console.log("Peliculas: ", this.Peliculas);
    this._movie.getMovies().subscribe(
      (data) => {
        console.log('Peliculas servidor: ', data);
        this.ListaPeliculas = data;
      },
      (error) => {
        console.error('Error al obtener las películas: ', error);
      }
    );
  }

  openFormMovies() {
    this.changeView = !this.changeView;
  }

  editMovie(pNombre: string) {
    console.log('displayFormEdit: ', pNombre);
    this._movie.getIdMovie(pNombre).subscribe(
      (data) => {
        console.log('ID de la película: ', data);
        modalRef.componentInstance.id = data.idPelicula;
      },
      (error) => {
        console.error('Error al obtener el ID de la película: ', error);
      }
    )

    const modalRef = this.modalService.open(NgbdModal2Content, { size: 'lg'});
    modalRef.componentInstance.data = this.ListaPeliculas.find(x => x.NomPelicula === pNombre);
  }

  addMovie() {
    const movie = {
      NomPelicula: this.fieldName,
      Duracion: this.fieldDuration,
      CantDisponible: this.fieldStock,
      Proveedor: this.fieldSupplier,
      Imagen: this.fieldPoster,
      Sinopsis: this.fieldDescription,
      Categorias: this.fieldCategorias,
      Precio: this.fieldPrice
    }

    this._movie.crearMovie(movie).subscribe(
      (data) => {
        console.log('Pelicula creada: ', data);
        this.ListaPeliculas.push(data);
      },
      (error) => {
        console.error('Error al crear la película: ', error);
      }
    )

    this.changeView = !this.changeView;
  }
}

@Component({
  standalone: true,
  imports: [FormsModule],
  styles: [`
    h3 {
      text-align: center;
      font-weight: bolder;
      color: var(--color-secondary);
    }

    form label {
      margin-top: 10px;
    }

    label {
      font-weight: bold;
      font-style: italic;
    }

    button.editMovies {
      justify-content: center;
      display: grid;
      margin: 0 auto;
      background-color: var(--color-secondary) !important;
      color: #fff !important;
      font-weight: 700;
    }
  `],
  providers: [MoviesService],
  template: `
    <h3  class="mt-2" style="text-align: center;"> {{"EDITAR REGISTROS"}}</h3>

    <div class="container mb-5">
      <form class="mt-4">
      <div class="m-3 container grid">
        <div class="row">
          <!--Row 1-->
          <div class="col-6">
            <label>Nombre</label>
            <input type="text" class="form-control" name="nombre" placeholder="{{data.NomPelicula}}" [(ngModel)]="editfieldName">
          </div>
          <div class="col-6">
            <label>Duración (minutos)</label>
            <input type="number" class="form-control" name="duration" placeholder="{{data.Duracion}}" [(ngModel)]="editfieldDuration">
          </div>
          <!--Row 2-->
          <!--Row 3-->
          <div class="col-12">
            <label>Poster pelicula</label>
            <input type="text" class="form-control" name="img" placeholder="{{data.Imagen}}" [(ngModel)]="editfieldPoster">
          </div>
          <!--Row 4-->
          <div class="col-12">
            <label>Sinopsis</label>
            <input type="text" class="form-control" name="descripcion" placeholder="{{data.Sinopsis}}" [(ngModel)]="editfieldDescription">
          </div>
          <!--Row 5-->
          <div class="col-6">
            <label>Categorias</label>
            <input type="text" class="form-control" name="categorias" placeholder="{{data.Categoria}}" [(ngModel)]="editfieldCategorias">
          </div>
          <div class="col-3">
            <label>Precio</label>
            <input type="text" class="form-control" name="precio" placeholder="{{data.Precio}}" [(ngModel)]="editfieldPrice">
          </div>
          <div class="col-3">
            <label>Stock a comprar</label>
            <input type="text" class="form-control" name="stock" placeholder="{{data.CantDisponible}}" [(ngModel)]="editfieldStock">
          </div>
        </div>
      </div>

      <button type="submit" (click)="edit()" class="btn editMovies mt-3">Actualizar pelicula</button>
      </form>
    </div>
  `
})
export class NgbdModal2Content implements OnInit {

  @Input() data: any;
  @Input() id: any;

  constructor(public activeModal: NgbActiveModal, private movie: MoviesService) {}

  editfieldName: any;
  editfieldDuration: any;
  editfieldStock: any;
  editfieldPoster: any;
  editfieldDescription: any;
  editfieldCategorias: any;
  editfieldPrice: any;

  valoresTemp: any;

  ngOnInit() {
    this.valoresTemp = JSON.parse(JSON.stringify(this.data));
  }

  edit() {
    let nuevosValores = {
      NomPelicula: this.editfieldName === undefined ? this.valoresTemp.NomPelicula : this.editfieldName,
      Duracion: this.editfieldDuration === undefined ? this.valoresTemp.Duracion : this.editfieldDuration,
      Imagen: this.editfieldPoster === undefined ? this.valoresTemp.Imagen : this.editfieldPoster,
      Sinopsis: this.editfieldDescription === undefined ? this.valoresTemp.Sinopsis : this.editfieldDescription,
      Precio: this.editfieldPrice === undefined ? this.valoresTemp.Precio : this.editfieldPrice,
      CantDisponible: this.editfieldStock === undefined ? this.valoresTemp.CantDisponible : this.editfieldStock,
    };

    console.log('nuevosValores: ', nuevosValores);
    console.log('id: ', this.id);

    this.movie.editarMovie(this.id, nuevosValores).subscribe(
      (data) => {
        console.log('Pelicula actualizada: ', data);
      },
      (error) => {
        console.error('Error al actualizar la película: ', error);
      }
    );

    this.activeModal.close();
  }
}
