import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {

  constructor() { }

  formuLogIn = new FormGroup({
    usuario_id: new FormControl('', [Validators.required, Validators.minLength(3)]),
    usuario_pass: new FormControl('', [Validators.required, Validators.minLength(6)])
  })

  signIN() {
    console.log("Valores ingresados: ", this.formuLogIn.value);
  }
}
