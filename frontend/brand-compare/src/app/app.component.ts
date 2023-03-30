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

  displayedColumns: string[] = [
    'brandName',
    'totalProfiles',
    'totalFans',
    'totalEngagement',
  ];

  range = new FormGroup({
    start: new FormControl<Date>(new Date()),
    end: new FormControl<Date>(new Date()),
  });

  constructor(private brandsService: BrandsService) {}

  ngOnInit() {
    this.getBrands(this.range.value.start, this.range.value.end);
  }

  getBrands(
    start: Date | null | undefined,
    end: Date | null | undefined
  ): void {
    this.brands$ = this.brandsService.getBrands(start, end);
  }

  updateTable() {
    let startDate = this.range.value.start;
    let endDate = this.range.value.end;

    this.getBrands(startDate, endDate);
  }
}
