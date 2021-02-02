import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {ZayavkaInterface} from '../../interfaces/ZayavkaInterface';
import {Subscription} from 'rxjs';
import {Houses} from '../../classes/Houses';
import {Status} from '../../classes/Status';
import {TypeWork} from '../../classes/TypeWork';
import {DataHandlerService} from '../../services/data-handler.service';
import {Disconnection} from '../../classes/Disconnection';
import {MatPaginator} from '@angular/material/paginator';
import {elementShow} from '../../animations';
import {FormControl, FormGroup} from '@angular/forms';
import {CitizenInfoDialogComponent} from '../../dialog/citizen-info-dialog/citizen-info-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {DisconnectionAdditionDialogComponent} from '../../dialog/disconnection-addition-dialog/disconnection-addition-dialog.component';

@Component({
  selector: 'app-disconnections',
  templateUrl: './disconnections.component.html',
  styleUrls: ['./disconnections.component.css'],
  animations: [elementShow]
})
export class DisconnectionsComponent implements OnInit {

  displayedColumns: string[] = ['number', 'address', 'comment', 'dateStart', 'dateEnd', 'type', 'initiator'];
  dataSource = new MatTableDataSource<Disconnection>();
  disconnections: Disconnection[] = [];
  textFilter: string = '';
  houses: Houses[] = [];
  types: TypeWork[] = [];

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator | undefined;

  addressSearch: string = '';
  kindSearch: string = '';
  typeSearch: string = '';
  statusSearch: string = '';
  textSearch: string = '';
  status: Status[] = [];
  intervalSearch: string = '';
  initiatorSearch: string = '';
  intervalStartSearch: Date;
  intervalEndSearch: Date;


  constructor(private dataHandlerService: DataHandlerService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.dataHandlerService.disconnectionsSubject.subscribe(disc => {
      this.disconnections = disc;
      this.dataHandlerService.filtersDisconnections();
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
    this.disconnections = this.dataHandlerService.filtersDisconnections(this.textSearch, this.addressSearch, this.intervalStartSearch, this.intervalEndSearch, this.typeSearch, this.initiatorSearch);
    this.updateDataTable();
  }

  private updateDataTable() {
    this.dataSource = new MatTableDataSource<Disconnection>(this.disconnections);
    this.dataSource.paginator = this.paginator!;
  }

  openDisconnectionAdditionDialog(disconnection?: any) {
    let dialogRef = this.dialog.open(DisconnectionAdditionDialogComponent, {
      width: '700px !important',
       data: [{disconnection : disconnection}, {houses: this.houses}, {types: this.types}], autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
        if (result && result[1] === 'add') {
          result.id = this.dataHandlerService.setNewDisconnection(result);
        }
      if (result && result[1] === 'update') {
        result.id = this.dataHandlerService.updateDisconnection(result);
      }
      }
    );
  }

  clearDate() {
    // @ts-ignore
    this.intervalStartSearch = null;
    // @ts-ignore
    this.intervalEndSearch = null
    this.showTable();
  }
}
