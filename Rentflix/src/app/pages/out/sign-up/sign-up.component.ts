import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  providers: [DatePipe]
})
export class SignUpComponent implements OnInit {

  public listGender = [
    { id: 1, value: 'H', label: 'Hombre' },
    { id: 2, value: 'M', label: 'Mujer' },
    // { id: 3, value: 'O', label: 'Other' }
  ];
  public selectGender: any;
  public showP: boolean = false;
  public listTypeHouse = [
    { id: 1, value: 'casa', label: 'Casa' },
    { id: 2, value: 'apartamento', label: 'Apartamento' },
    { id: 3, value: 'urbanización', label: 'Urbanización' },
  ];
  public selectTypeHouseValue: any;

  constructor(private datePipe: DatePipe) { }

  fieldName: string = '';
  fieldDate: NgbDateStruct = { year: 0, month: 0, day: 0 };
  fieldNumberC: number = 0;
  fieldNumberF: number = 0;
  fieldStreet_Address: string = '';
  fieldNumber_Address: string = '';
  fieldComments_Address: string = '';
  fieldCorreo: string = '';
  fieldCorreoConfirmation: string = '';
  fieldPass: string = '';

  ngOnInit(): void {

  }

  showPass() {
    let x = document.getElementById("inputPassword");
    if (x) {
      if (x.getAttribute("type") === "password") {
        x.setAttribute("type", "text");
        this.showP = true;
      } else {
        x.setAttribute("type", "password");
        this.showP = false;
      }
    }
  }

  signUP() {
    console.log('signUP');
    const newDate = new Date(this.fieldDate.year, this.fieldDate.month - 1, this.fieldDate.day);
    let date = this.formatDate(newDate);

    if( this.fieldCorreo !== this.fieldCorreoConfirmation ){
      alert('Los correos no coinciden');
    } else {
      console.log({
        fullname: this.fieldName,
        date,
        genero: this.selectGender,
        numero_celular: this.fieldNumberC,
        numero_fijo: this.fieldNumberF,
        direccion_street: this.fieldStreet_Address,
        direccion_number: this.fieldNumber_Address,
        direccion_type: this.selectTypeHouseValue,
        direccion_comments: this.fieldComments_Address,
        correo: this.fieldCorreo,
        password: this.fieldPass
      });
    }


  }

  formatDate(date: Date): string {
    return this.datePipe.transform(date, 'yyyy-MM-dd') || '';
  }

}
