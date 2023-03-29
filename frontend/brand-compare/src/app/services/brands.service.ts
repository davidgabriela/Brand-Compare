import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from '../Brand';

@Injectable({
  providedIn: 'root',
})
export class BrandsService {
  URL = 'http://localhost:3000/';

  constructor(private http: HttpClient) {}

  getBrands(): Observable<Brand[]> {
    return this.http.get<Brand[]>(this.URL);
  }
}