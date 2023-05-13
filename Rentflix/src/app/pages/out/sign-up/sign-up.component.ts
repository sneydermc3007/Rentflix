import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../services/auth.service';
import { RegistroUsuario } from "../modules/auth.interface";

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

  constructor(private datePipe: DatePipe, private _auth: AuthService) { }

  fieldName: string = '';
  fieldDate: NgbDateStruct = { year: 0, month: 0, day: 0 };
  fieldNumberC: string = '';
  fieldNumberF: string = '';
  fieldStreet_Address: string = '';
  fieldNumber_Address: string | number = '';
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

    if ( this.fieldName === '' || date === '' || this.selectGender === '' ||
      this.fieldNumberC === '' || this.fieldNumberF === '' ||
      this.fieldStreet_Address === '' || this.fieldNumber_Address === '' ||
      this.selectTypeHouseValue === '' ||
      this.fieldCorreo === '' || this.fieldCorreoConfirmation === '' || this.fieldPass === ''
    ) {
      alert('Por favor, llene todos los campos algunos estan vacios');
      console.error('Hay campos vacios');
    }
    else if (this.fieldCorreo !== this.fieldCorreoConfirmation) {
      alert('El campo correo de confirmación no coincide con el correo ingresado');
      console.error('Correo de confirmación diferente');
    } else {
      let dataForm: RegistroUsuario = {
        nombreCompleto: this.fieldName,
        genero: this.selectGender,
        num_celular: this.fieldNumberC,
        num_fijo: this.fieldNumberF,
        fecha_nacimiento: date,
        address_comments: this.fieldComments_Address,
        address_number: this.fieldNumber_Address,
        address_street: this.fieldStreet_Address,
        address_type: this.selectTypeHouseValue,
        correo: this.fieldCorreo,
        password: this.fieldPass
      };

      this._auth.postRegister(dataForm).subscribe(
        (response) => {
          console.log("Respuesta API: ", response);
          alert(`
            Usuario ${this.fieldName} registrado correctamente, estas son sus credenciales:
            Correo: ${this.fieldCorreo}
            Contraseña: ${this.fieldPass}

            Sera redirigido al login en segundos para que pueda ingresar.
          `);
          setTimeout(() => {
            window.location.href = '/Sign';
          }, 5000);
        }
      );
    }
  }

  formatDate(date: Date): string {
    return this.datePipe.transform(date, 'yyyy-MM-dd') || '';
  }

}
