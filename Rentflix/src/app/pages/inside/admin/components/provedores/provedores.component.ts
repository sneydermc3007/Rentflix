import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-provedores',
  templateUrl: './provedores.component.html',
  styleUrls: ['./provedores.component.scss']
})
export class ProvedoresComponent implements OnInit {

  public listProvedores = [
    {
      nombreProvedor: 'Sony',
      web: 'https://www.sonypictures.com/movies',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Sony_Movies_Logo.svg/1021px-Sony_Movies_Logo.svg.png'
    },
    {
      nombreProvedor: 'Disney',
      web: 'https://www.disneyplus.com/es-co',
      image: 'https://assets.puzzlefactory.pl/puzzle/395/608/original.jpg'
    }
  ];

  public displayModal = false;

  constructor(private modalService: NgbModal, public activeModal: NgbActiveModal) { }

  public nombreProvedor: string = '';
  public webProvedor: string = '';
  public imageProvedor: string = '';

  ngOnInit() {}

  openExternalPage(url: string) {
    window.open(url, '_blank');
  }

  openFormProvedores() {
    this.displayModal = true;
  }

  registrarProvedor() {
    this.listProvedores.push({
      nombreProvedor: this.nombreProvedor,
      web: this.webProvedor,
      image: this.imageProvedor
    });
    this.displayModal = false;
  }
}
