import { Injectable } from '@angular/core';
import { Route } from './route';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class RouteService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  addRoute(route: Route): Observable<any> {
    return this.http.post<Route>('http://localhost:3000/api/create-route', route, this.httpOptions)
      .pipe(
        catchError(this.handleError<Route>('Add Route'))
      );
  }

  getRoute(id): Observable<Route[]> {
    return this.http.get<Route[]>('http://localhost:3000/api/get-route/' + id)
      .pipe(
        tap(_ => console.log(`Route fetched: ${id}`)),
        catchError(this.handleError<Route[]>(`Get Route id=${id}`))
      );
  }

  getRouteList(): Observable<Route[]> {
    return this.http.get<Route[]>('http://localhost:3000/api')
      .pipe(
        tap(Routes => console.log('Routes fetched!')),
        catchError(this.handleError<Route[]>('Get Routes', []))
      );
  }

  updateRoute(id, route: Route): Observable<any> {
    return this.http.put('http://localhost:3000/api/update-route/' + id, route, this.httpOptions)
      .pipe(
        tap(_ => console.log(`Route updated: ${id}`)),
        catchError(this.handleError<Route[]>('Update Route'))
      );
  }

  deleteRoute(id): Observable<Route[]> {
    return this.http.delete<Route[]>('http://localhost:3000/api/delete-route/' + id, this.httpOptions)
      .pipe(
        tap(_ => console.log(`Route deleted: ${id}`)),
        catchError(this.handleError<Route[]>('Delete Route'))
      );
  }

  register(body:any)  {
    return this.http.post<Route>('http://127.0.0.1:3000/api/register', body, {
      observe:'body',
      headers:new HttpHeaders().append('Content-Type', 'application/json')
    });
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
