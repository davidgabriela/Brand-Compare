import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

export interface Brand {
  name: string;
  totalProfiles: number;
  totalFans: number;
  totalEngagement: number;
}

const ELEMENT_DATA: Brand[] = [
  { name: 'Nike', totalProfiles: 2, totalFans: 1000, totalEngagement: 4000 },
  { name: 'Gucci', totalProfiles: 4, totalFans: 1000, totalEngagement: 4000 },
  {
    name: 'Adidas',
    totalProfiles: 3,
    totalFans: 1000,
    totalEngagement: 4000,
  },
  {
    name: 'Balenciaga',
    totalProfiles: 3,
    totalFans: 1000,
    totalEngagement: 4000,
  },
  { name: 'Guess', totalProfiles: 1, totalFans: 1000, totalEngagement: 4000 },
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  displayedColumns: string[] = [
    'name',
    'totalProfiles',
    'totalFans',
    'totalEngagement',
  ];
  dataSource = ELEMENT_DATA;

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
}
