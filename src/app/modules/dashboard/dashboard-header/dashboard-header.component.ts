import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.scss']
})
export class DashboardHeaderComponent implements OnInit {
  @ViewChild('filterSelect') filterSelect: ElementRef | undefined;
  @ViewChild('sortSelect') sortSelect: ElementRef | undefined;

  filterForm: FormGroup;

  filters: any = [
    {value: 'all', viewValue: 'All Categories'},
    {value: 'productivity', viewValue: 'Productivity'},
    {value: 'business', viewValue: 'Business'},
    {value: 'media', viewValue: 'Media'},

  ];
  filterControl = new FormControl(this.filters[0].value);

  sortForm: FormGroup;

  sorts: any = [
    {value: 'ascending', viewValue: 'Ascending'},
    {value: 'descending', viewValue: 'Descending'},
  ];
  sortControl = new FormControl(this.sorts[0].value);

  constructor() {
    this.filterForm = new FormGroup({
      filter: this.filterControl,
    })
    this.sortForm = new FormGroup({
      sort: this.sortControl,
    })
  }

  ngOnInit(): void {
  }

  changeFilterValue(value: string): void {
    console.log("Change filter value", value)
  }
  changeSortValue(value: string): void {
    console.log("Change sort value", value)
  }

}
