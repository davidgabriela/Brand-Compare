import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Brand } from './Brand';
import { BrandsService } from './services/brands.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  brands$: Observable<Brand[]> = new Observable();
  dataSource: Brand[] = [];

  displayedColumns: string[] = [
    'brandName',
    'totalProfiles',
    'totalFans',
    'totalEngagement',
  ];

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  constructor(private brandsService: BrandsService) {}

  ngOnInit() {
    this.getBrands();
  }

  getBrands(): void {
    this.brands$ = this.brandsService.getBrands();
  }
}
