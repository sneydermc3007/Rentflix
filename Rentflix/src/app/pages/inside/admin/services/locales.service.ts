import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, throwError } from 'rxjs';
import { catchError } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class LocalesService {

  constructor(private http: HttpClient) { }

  getLocation() {
    return this.http.get<any>('http://localhost:5000/localesObt', {
      headers: {'Content-Type': 'application/json'}
    }).pipe(
      tap((res) => {
        return res
      }),
      catchError((error) => throwError(error))
    )
  }
}
