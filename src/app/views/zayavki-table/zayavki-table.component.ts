import {Component, Input, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {MatTableModule} from '@angular/material/table';
import {Zayavka} from '../../interfaces/Zayavka';
import {DataHandlerService} from '../../services/data-handler.service';
import {Subscription} from 'rxjs';
import {Houses} from '../../classes/Houses';
import {Status} from '../../classes/Status';


@Component({
  selector: 'app-zayavki-table',
  templateUrl: './zayavki-table.component.html',
  styleUrls: ['./zayavki-table.component.css']
})
export class ZayavkiTableComponent implements OnInit {
  displayedColumns: string[] = ['number', 'address', 'status', 'dateBegin', 'kind'];
  dataSource = new MatTableDataSource<Zayavka>();
  zayavki: Zayavka[];
  subscription: Subscription;
  textFilter: string = '';
  houses: Houses[];
  status: Status[];

  // @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  // @Input('zayavki') set setZayavki(zayavki: Zayavka[]) {
  //   this.zayavki = zayavki;
  //   this.dataSource = new MatTableDataSource<Zayavka>(this.zayavki);
  //   this.dataSource.data = [...this.zayavki];
  //   this.dataSource.paginator = this.paginator;
  //   this.dataSource._updateChangeSubscription();
  //   this.table.renderRows();
  // }

  // ngAfterViewInit() {
  //   setTimeout(() => {
  //     this.dataSource.data = this.zayavki;
  //   }, 1);
  // }

  constructor(private dataHandlerService: DataHandlerService) {
  }

  ngOnInit(): void {
    this.subscription = this.dataHandlerService.zayavkiSubject.subscribe(zayavki => {
      this.zayavki = zayavki;
      this.updateDataTable();
    });
    this.dataHandlerService.housesList.subscribe(
      houses => this.houses = houses
    );
    this.dataHandlerService.statusList.subscribe(
      status => this.status = status
    );
  }

  updateDataTable() {
    this.dataSource = new MatTableDataSource<Zayavka>(this.zayavki);
    this.dataSource.paginator = this.paginator;
  }

  showTable(event?: any, text?: string, address?: string, status?: string, kind?: string, type?: string,) {
    // console.log(event.isUserInput);
    console.log(status);
    if (event !== undefined) {
      if (event.isUserInput) {
        this.zayavki = this.dataHandlerService.filters(text, address, status);
        this.updateDataTable();
      }
    } else {
      this.zayavki = this.dataHandlerService.filters(text, address, status);
      this.updateDataTable();
    }
  }
}
