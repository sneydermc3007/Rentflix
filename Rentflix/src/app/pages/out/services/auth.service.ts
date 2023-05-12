import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { LoginUsuario, RegistroUsuario } from './../modules/auth.interface';

import { Observable, tap, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  getUser(correo: string, password: string): Observable<LoginUsuario> {
    return this.http.post<LoginUsuario>('http://localhost:5000/login', {
      correo,
      contrasena: password
    }, {
      headers: {'Content-Type': 'application/json'}
    }).pipe(
      tap((res: LoginUsuario) => {
        // console.log('Respuesta del servidor: ', res)

        sessionStorage.setItem('User', JSON.stringify(res))
        return res
      }),
      catchError((error) => throwError(error))
    )
  }

  postRegister(datos: RegistroUsuario): Observable<HttpResponse<any>> {
    return this.http.post<HttpResponse<any>>('http://localhost:5000/datosRegistro', {
      fullname: datos.nombreCompleto,
      genero: datos.genero,
      num_celular: datos.num_celular,
      num_fijo: datos.num_fijo,
      date: datos.fecha_nacimiento,
      direccion_comments: datos.address_comments,
      direccion_number: datos.address_number,
      direccion_street: datos.address_street,
      direccion_type: datos.address_type,
      correo: datos.correo,
      password: datos.password
    }, {
      headers: {'Content-Type': 'application/json'}
    }).pipe(
      tap((res: HttpResponse<any>) => {
        console.log('Respuesta del servidor: ', res)
        return res
      }),
      catchError((error) => throwError(error))
    )
  }

  userLogged(): boolean {
    return !!sessionStorage.getItem('User')
  }
}

