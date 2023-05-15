import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, throwError } from 'rxjs';
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {

  constructor(private http: HttpClient) { }

  getProveedores() {
    return this.http.get<any>('http://localhost:5000/proveedoresObt', {
      headers: {'Content-Type': 'application/json'}
    }).pipe(
      tap((res) => {
        return res
      }),
      catchError((error) => throwError(error))
    )
  }

  postProveedores(nombreProvedor: string, web: string, imagen: string) {
    return this.http.post<any>('http://localhost:5000/proveedores', {
      nombre: nombreProvedor,
      web,
      imagen
    }, {
      headers: {'Content-Type': 'application/json'}
    }).pipe(
      tap((res) => {
        return res
      }),
      catchError((error) => throwError(error))
    )
  }
}
