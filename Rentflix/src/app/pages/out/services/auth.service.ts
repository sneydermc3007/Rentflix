import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { LoginUsuario, RegistroUsuario } from './../modules/auth.interface';

import { Observable, tap, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  postRegister(datos: RegistroUsuario): Observable<LoginUsuario> {

    return this.http.post<LoginUsuario>('localhost:3000/datosRegistro', {
      fullname: datos.nombreCompleto,
      genero: datos.genero,
      num_celular: datos.num_celular,
      num_fijo: datos.num_fijo,
      date: datos.fecha_nacimiento,
      direccion_comments: datos.comments,
      direccion_number: datos.number,
      direccion_street: datos.street,
      direccion_type: datos.type,
      correo: datos.correo,
      password: datos.password
    }, {
      headers: {'Content-Type': 'application/json'}
    }).pipe(
      tap((res: LoginUsuario) => {
        console.log('Respuesta del servidor: ', res)
        return res
      }),
      catchError((error) => throwError(error))
    )

  }

  userLogged(): boolean {
    return !!localStorage.getItem('User')
  }
}

