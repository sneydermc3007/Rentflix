import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {

  constructor(private _auth: AuthService, private router: Router) {
   }

  formuLogIn = new FormGroup({
    usuario_mail: new FormControl('', [Validators.required, Validators.email]),
    usuario_pass: new FormControl('', [Validators.required, Validators.minLength(5)])
  })

  signIN() {
    console.log("Valores ingresados: ", this.formuLogIn.value);

    if(this.formuLogIn.valid) {
      // let { usuario_mail, usuario_pass } = this.formuLogIn.value

      let usuario_mail = this.formuLogIn.value.usuario_mail
      let usuario_pass = this.formuLogIn.value.usuario_pass as string

      this._auth.getUser(String(usuario_mail), usuario_pass).subscribe(
        (res) => {
          console.log('Respuesta de Flask: ', res)
          this.router.navigate(['/Inside'])
        },
        (error: HttpErrorResponse ) => {
          console.log('Se obtuvo un error: ', error)

          if(error.status === 400) {
            alert('Por favor ingrese todos los datos')
          }

          if(error.status === 401) {
            alert('Usuario y/o contraseña incorrectos')
          }
          if(error.status === 500) {
            alert('Error en el servidor')
          }
        }
      )
    }
  }
}
