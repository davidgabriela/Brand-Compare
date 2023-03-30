import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from '../Brand';

@Injectable({
  providedIn: 'root',
})
export class BrandsService {
  URL = 'http://localhost:3000/brands';

  constructor(private http: HttpClient) {}

  getBrands(
    startDate: Date | null | undefined,
    endDate: Date | null | undefined
  ): Observable<Brand[]> {
    let start = null;
    let end = null;

    if (startDate && endDate) {
      start = new Date(startDate).getTime();
      end = new Date(endDate).getTime();
    }

    console.log(`${this.URL}?start=${start}&end=${end}`);

    return this.http.get<Brand[]>(`${this.URL}?start=${start}&end=${end}`);
  }
}
