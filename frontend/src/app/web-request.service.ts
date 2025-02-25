//interface pour effectuer des requêtes HTTP vers un backend. 

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';  //Indique que ce service peut être injecté dans d'autres composants.
import { Observable } from 'rxjs';


@Injectable({         //signifie que ce service est disponible globalement dans toute l'application
  providedIn: 'root'
})

export class WebRequestService {

  readonly ROOT_URL;

  constructor(private http: HttpClient) { 
    this.ROOT_URL = 'http://localhost:3001';   //l'url de base du backend
  }

  get<T>(uri: string): Observable<T> {
    return this.http.get<T>(`${this.ROOT_URL}/${uri}`);
  }

  post(uri: string, payload: Object) {
    return this.http.post(`${this.ROOT_URL}/${uri}`, payload);
  }

  patch(uri: string, payload: Object) {
    return this.http.patch(`${this.ROOT_URL}/${uri}`, payload);
  }

  delete(uri: string) {
    return this.http.delete(`${this.ROOT_URL}/${uri}`);
  }
}
