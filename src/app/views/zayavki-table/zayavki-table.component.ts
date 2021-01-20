import {Component, Input, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {MatTableModule} from '@angular/material/table';
import {Zayavka} from '../../interfaces/Zayavka';
import {DataHandlerService} from '../../services/data-handler.service';
import {Subscription} from 'rxjs';
import {Houses} from '../../classes/Houses';
import {Status} from '../../classes/Status';
import {TypeWork} from '../../classes/TypeWork';
import {KindWork} from '../../classes/KindWork';
import {Routes, RouterModule, Router} from '@angular/router';


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
  types: TypeWork[];
  kinds: KindWork[];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  addressSearch: string;
  kindSearch: string;
  typeSearch: string;
  statusSearch: string;
  textSearch: string;
  prinStat: number;

  constructor(private dataHandlerService: DataHandlerService, private router: Router) {
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
    this.dataHandlerService.kindList.subscribe(
      kinds => this.kinds = kinds
    );
    this.dataHandlerService.typeList.subscribe(
      types => this.types = types
    );
  }

  updateDataTable() {
    this.dataSource = new MatTableDataSource<Zayavka>(this.zayavki);
    this.dataSource.paginator = this.paginator;

  }

  showTable() {
        this.zayavki = this.dataHandlerService.filters(this.textSearch, this.addressSearch, this.statusSearch, this.typeSearch, this.kindSearch);
        this.updateDataTable();
  }

  checkStat(status: string) {
    this.prinStat = this.zayavki.filter(zayavkiList => zayavkiList.status === status).length;
  }

  navigate(zayavka: Zayavka) {
    console.log(zayavka);
    this.dataHandlerService.setCurrentZayavka(zayavka);
    this.router.navigate(['/adsCurrent']);
  }



}
