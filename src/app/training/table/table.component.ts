import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from "@angular/material";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns = ['date', 'name', 'number'];
  dataSource = new MatTableDataSource<Element>();

  constructor() {
  }

  ngOnInit() {
    this.dataSource.data = [
      {date: new Date(), name: '1', number: 5},
      {date: new Date(), name: '2', number: 2},
      {date: new Date(), name: '4', number: 3},
      {date: new Date(), name: '3', number: 4},
      {date: new Date(), name: '5', number: 1},
      {date: new Date(), name: '1', number: 5},
      {date: new Date(), name: '2', number: 2},
      {date: new Date(), name: '4', number: 3},
      {date: new Date(), name: '3', number: 4},
      {date: new Date(), name: '5', number: 1},
      {date: new Date(), name: '1', number: 5},
      {date: new Date(), name: '2', number: 2},
      {date: new Date(), name: '4', number: 3},
      {date: new Date(), name: '3', number: 4},
      {date: new Date(), name: '5', number: 1},
      {date: new Date(), name: '1', number: 5},
      {date: new Date(), name: '2', number: 2},
      {date: new Date(), name: '4', number: 3},
      {date: new Date(), name: '3', number: 4},
      {date: new Date(), name: '5', number: 1}
    ]
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

export interface Element {
  date: Date;
  name: string;
  number: number
}
