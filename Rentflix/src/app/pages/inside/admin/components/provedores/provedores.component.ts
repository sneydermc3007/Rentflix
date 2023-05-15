import { Component, OnInit } from '@angular/core';
import { ProveedoresService } from '../../services/proveedores.service';

@Component({
  selector: 'app-provedores',
  templateUrl: './provedores.component.html',
  styleUrls: ['./provedores.component.scss']
})
export class ProvedoresComponent implements OnInit {

  // public listProvedores = [
  //   {
  //     nombreProvedor: 'Sony',
  //     web: 'https://www.sonypictures.com/movies',
  //     image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Sony_Movies_Logo.svg/1021px-Sony_Movies_Logo.svg.png'
  //   },
  //   {
  //     nombreProvedor: 'Disney',
  //     web: 'https://www.disneyplus.com/es-co',
  //     image: 'https://assets.puzzlefactory.pl/puzzle/395/608/original.jpg'
  //   }
  // ];

  public listProvedores: any[] = [];

  public displayModal = false;

  constructor(private _proveedores: ProveedoresService) { }

  public nombreProvedor: string = '';
  public webProvedor: string = '';
  public imageProvedor: string = '';

  ngOnInit() {
    this._proveedores.getProveedores().subscribe((res) => {
      console.log("Provedores: ", res);
      this.listProvedores = res;
    });
  }

  openExternalPage(url: string) {
    console.log("URL: ", url);
    window.open(url, '_blank');
  }

  openFormProvedores() {
    this.displayModal = true;
  }

  registrarProvedor() {
    this._proveedores.postProveedores(this.nombreProvedor, this.webProvedor, this.imageProvedor)
    .subscribe((res) => {
      console.log("Provedor registrado: ", res);
      this.listProvedores.push({
        NomProveedor: this.nombreProvedor,
        SitioWeb: this.webProvedor,
        Imagen: this.imageProvedor
      });
    },
      (error) => console.log("Error: ", error)
    )

    this.displayModal = false;
    [this.nombreProvedor, this.webProvedor, this.imageProvedor] = ['', '', ''];
  }
}
