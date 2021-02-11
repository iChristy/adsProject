import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Route, Router} from '@angular/router';
import {Zayavka} from '../../classes/Zayavka';
import {ContentsDialogComponent} from '../../dialog/contents-dialog/contents-dialog.component';
import {DataHandlerService} from '../../services/data-handler.service';
import {MatDialog} from '@angular/material/dialog';
import {ZayavkiEditDialogComponent} from '../../dialog/zayavki-edit-dialog/zayavki-edit-dialog.component';
import {ConfirmDialogComponent} from '../../dialog/confirm-dialog/confirm-dialog.component';
import {EmployeeEditDialogComponent} from '../../dialog/employee-edit-dialog/employee-edit-dialog.component';
import {Updates} from '../../classes/Updates';

@Component({
  selector: 'app-zayavki-current',
  templateUrl: './zayavki-current.component.html',
  styleUrls: ['./zayavki-current.component.css']
})
export class ZayavkiCurrentComponent implements OnInit {

  zayavka: Zayavka;
  workerName: string = '';
  dispatcherName: string = '';
  masterName: string = '';

  constructor(private router: Router, private dialog: MatDialog, private dataHandlerService: DataHandlerService) {
  }

  ngOnInit(): void {
    // this.route.params.subscribe((params: Params) => {
    //   console.log(params);
    //   this.zayavka = new Zayavka(params);
    // });
    this.dataHandlerService.currentZayavka.subscribe(zayavka => this.zayavka = zayavka);
    if (this.zayavka.code === null || this.zayavka.code === undefined) {
      this.router.navigate(['/adsTable]']);
    }
    this.getNames();
  }

  getNames() {
    // @ts-ignore
    this.masterName = this.zayavka.masterId ? this.dataHandlerService.employeeList.find(m => m.id === this.zayavka.masterId).name : '';
    // @ts-ignore
    this.workerName = this.zayavka.workerId ? this.dataHandlerService.employeeList.find(w => w.id === this.zayavka.workerId).name : '';
    // @ts-ignore
    this.dispatcherName = this.dataHandlerService.employeeList.find(d => d.id === this.zayavka.dispatcherId).name;
  }

  openContentsDialog() {
    let dialogRef = this.dialog.open(ContentsDialogComponent, {
      width: '700px !important',
      height: '60%', data: [this.zayavka.typeWork, this.zayavka.kindWork, (this.zayavka.services.toString()).split(',')], autoFocus: false
    });

    let timeArray: number[] = [];

    dialogRef.afterClosed().subscribe(result => {
        this.zayavka.services = [];
        if (result) {
          this.zayavka.services = [];
          result[0].forEach((r: { name: string; }) => this.zayavka.services.push(r.name));
          this.zayavka.time = result[1];
          this.zayavka.price = result[2];
          let updateFields =  Object({'contents': this.zayavka.services, 'time': this.zayavka.time, 'price': this.zayavka.price});
          this.dataHandlerService.updateAndSendZayavka(new Updates(this.zayavka.code, this.zayavka.prefix, updateFields));
        }
      }
    );
  }

  openEditDialog(title: string, fieldTitle: string, fieldName: string, fieldValue: string) {
    let dialogRef = this.dialog.open(ZayavkiEditDialogComponent, {
      width: '700px !important',
      data: [title, fieldTitle, fieldName, fieldValue], autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
        if (result) {
          Object.keys(this.zayavka).forEach(key => key === fieldName ? Object(this.zayavka)[key] = result : '');
          let updateFields = Object({fieldName: result[0]});
          this.dataHandlerService.updateAndSendZayavka(new Updates(this.zayavka.code, this.zayavka.prefix, updateFields));
        }
      }
    );
  }

  openEditEmpoyeeDialog(title: string, fieldTitle: string, fieldName: string, fieldValue: string, typeWork: string) {
    let dialogRef = this.dialog.open(EmployeeEditDialogComponent, {
      width: '700px !important',
      data: [title, fieldTitle, fieldName, fieldValue, typeWork], autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
        if (result) {
          let updateFields = null;
          Object.keys(this.zayavka).forEach(key => key === fieldName ? Object(this.zayavka)[key] = result : '');
          if (fieldName === 'workerId') {
            if (this.zayavka.status === 'принято') {
              this.zayavka.status = 'назначено';
              this.zayavka.dateWorkStart = this.dataHandlerService.formatOfDate();
              updateFields = Object({fieldName: result[0], 'status': this.zayavka.status, 'dateWorkOn': this.zayavka.dateWorkStart});
            } else {
              updateFields = Object({fieldName: result[0]});
            }
          } else {
            updateFields = Object({fieldName: result[0]});
          }
          this.getNames();
          this.dataHandlerService.updateAndSendZayavka(new Updates(this.zayavka.code, this.zayavka.prefix, updateFields));
        }
      }
    );
  }

  openConfirmDialog(title: string, fieldName: string, fieldValue: string, dateName?: string) {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '700px !important',
      data: [title], autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
        if (result) {
          Object.keys(this.zayavka).forEach(key =>
            key === fieldName ? Object(this.zayavka)[key] = fieldValue : '');
          Object.keys(this.zayavka).forEach(key =>
            key === dateName ? Object(this.zayavka)[key] = this.dataHandlerService.formatOfDate() : '');
          let updateFields = dateName ? Object({fieldName: fieldValue, dateName: this.dataHandlerService.formatOfDate()}) : Object({fieldName: fieldValue});
          this.dataHandlerService.updateAndSendZayavka(new Updates(this.zayavka.code, this.zayavka.prefix, updateFields));
        }
      }
    );
  }
}
