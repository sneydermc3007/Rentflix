import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, tap, throwError } from 'rxjs';
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private http: HttpClient) { }

  getMovies() {
    return this.http.get<any>('http://localhost:5000/peliculasObt', {
      headers: {'Content-Type': 'application/json'}
    }).pipe(
      tap((res) => {
        // console.log('Respuesta del servidor: ', res)
        return res
      }),
      catchError((error) => throwError(error))
    )
  }
}
