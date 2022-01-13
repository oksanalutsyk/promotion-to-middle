import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.scss']
})
export class DashboardHeaderComponent implements OnInit {
  @ViewChild('filterSelect') filterSelect: ElementRef | undefined;
  filterForm: FormGroup;

  filters: any = [
    {value: 'all', viewValue: 'All Categories'},
    {value: 'productivity', viewValue: 'Productivity'},
    {value: 'business', viewValue: 'Business'},
    {value: 'media', viewValue: 'Media'},

  ];
  filterControl = new FormControl(this.filters[0].value);

  constructor() {
    this.filterForm = new FormGroup({
      filter: this.filterControl,
    })
  }

  ngOnInit(): void {
  }

  changeFilterValue(value: string): void {
    console.log("Change filter value", value)
  }
}
