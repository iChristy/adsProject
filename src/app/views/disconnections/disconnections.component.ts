import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Zayavka} from '../../interfaces/Zayavka';
import {Subscription} from 'rxjs';
import {Houses} from '../../classes/Houses';
import {Status} from '../../classes/Status';
import {TypeWork} from '../../classes/TypeWork';
import {DataHandlerService} from '../../services/data-handler.service';
import {Disconnection} from '../../classes/Disconnection';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-disconnections',
  templateUrl: './disconnections.component.html',
  styleUrls: ['./disconnections.component.css']
})
export class DisconnectionsComponent implements OnInit {

  displayedColumns: string[] = ['number', 'address', 'comment', 'dateStart', 'dateEnd', 'type', 'initiator'];
  dataSource = new MatTableDataSource<Disconnection>();
  disconnections: Disconnection[];
  textFilter: string = '';
  houses: Houses[];
  types: TypeWork[];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  addressSearch: string;
  kindSearch: string;
  typeSearch: string;
  statusSearch: string;
  textSearch: string;
  status: Status[];


  constructor(private dataHandlerService: DataHandlerService) {
  }

  ngOnInit(): void {
    this.dataHandlerService.disconnectionsList.subscribe(disc => {
      this.disconnections = disc;
      this.updateDataTable();
    });
    this.dataHandlerService.housesList.subscribe(
      houses => this.houses = houses
    );
    this.dataHandlerService.statusList.subscribe(
      status => this.status = status
    );
    this.dataHandlerService.typeList.subscribe(
      types => this.types = types
    );
  }

  show() {
    console.log(this.disconnections);
  }

  showTable() {
    // this.zayavki = this.dataHandlerService.filters(this.textSearch, this.addressSearch, this.statusSearch, this.typeSearch, this.kindSearch);
    // this.updateDataTable();
  }

  private updateDataTable() {
    this.dataSource = new MatTableDataSource<Disconnection>(this.disconnections);
    this.dataSource.paginator = this.paginator;
  }
}
