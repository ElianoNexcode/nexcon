import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map, timeout } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class GenericAPI {

  constructor(private http: HttpClient) { }

  apiGet(url: string) {
    return this.http.get(url, httpOptions)
      .pipe(
        timeout(30000),
        tap(_ => console.log(`OK! URL=${url}`)),                   // Tratar tap
        catchError(this.handleError(`ERROR! URL=${url}`))          // Tratar catch
      );
  };

  apiPost<T>(url: string, data: T) {
    return this.http.post(url, data)
      .pipe(
        timeout(30000),
        tap(_ => console.log(`OK! Operacao=${data}`)),              // Tratar tap
        catchError(this.handleError(`ERROR! Operacao=${data}`))     // Tratar catch
      );
  };

  apiPut<T>(url: string, data: T) {
    return this.http.put(url, data)
      .pipe(
        timeout(30000),
        tap(_ => console.log(`OK! Operacao=${data}`)),              // Tratar tap
        catchError(this.handleError(`ERROR! Operacao=${data}`))     // Tratar catch
      );
  };

  apiDelete<T>(url: string) {
    return this.http.delete(url, httpOptions)
      .pipe(
        timeout(30000),
        tap(_ => console.log(`OK! URL=${url}`)),                   // Tratar tap
        catchError(this.handleError(`ERROR! URL=${url}`))          // Tratar catch
      );
  };


  private handleError<T> (result?: T) {
    return (error: any): Observable<T> => {
      return throwError(result as T);
    };
  }

}
