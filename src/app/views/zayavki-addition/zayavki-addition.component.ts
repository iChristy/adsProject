import {Component, OnInit, AfterContentInit, AfterViewInit, Input} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DataHandlerService} from '../../services/data-handler.service';
import {Zayavka} from '../../classes/Zayavka';
import {Houses} from '../../classes/Houses';
import {Status} from '../../classes/Status';
import {TypeWork} from '../../classes/TypeWork';
import {KindWork} from '../../classes/KindWork';
import {User} from '../../classes/User';
import {MatDialog} from '@angular/material/dialog';
import {ContentsDialogComponent} from '../../dialog/contents-dialog/contents-dialog.component';
import {ActivatedRoute, Params} from '@angular/router';
import {CitizenInfoDialogComponent} from '../../dialog/citizen-info-dialog/citizen-info-dialog.component';
import {elementShow} from '../../animations';


@Component({
  selector: 'app-zayavki-addition',
  templateUrl: './zayavki-addition.component.html',
  styleUrls: ['./zayavki-addition.component.css'],
  animations: [elementShow]
})
export class ZayavkiAdditionComponent implements OnInit {

  firstFormGroup: FormGroup | undefined;
  secondFormGroup: FormGroup | undefined;
  // value: '2323';
  zayavki: Zayavka[] = [];
  houses: Houses[] = [];
  types: TypeWork[] = [];
  kinds: KindWork[] = [];
  a: any;
  workers: User[] = [];
  masters: User[] = [];
  tmpWorkers: User[] = [];
  tmpMasters: User[] = [];
  dispatchersMasters: User[]= [];
  @Input() zayavka: Zayavka;

  constructor(private _formBuilder: FormBuilder, private dataHandlerService: DataHandlerService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    // @ts-ignore
    this.zayavka = new Zayavka();
    this.dataHandlerService.housesList.subscribe(
      houses => this.houses = houses
    );
    this.dataHandlerService.typeList.subscribe(
      types => this.types = types
    );
    this.dataHandlerService.kindList.subscribe(
      kinds => this.kinds = kinds
    );
    // @ts-ignore
    this.zayavka = new Zayavka();
    this.dataHandlerService.workers.subscribe(workers => this.workers = workers);
    this.dataHandlerService.masters.subscribe(masters => this.masters = masters);
    this.dataHandlerService.dispatchersMasters.subscribe(dm => this.dispatchersMasters = dm);

  }

  show() {
    console.log(this.dataHandlerService.getContentList('Электротехнические', 'Текущая'));
    console.log(this.zayavka);
    console.log(this.dispatchersMasters);
  }

  changeListStaff() {
    this.tmpWorkers = this.workers;
    this.tmpMasters = this.masters;
    console.log(`${this.tmpWorkers[0].typeWork} - ${this.tmpMasters} - ${this.zayavka.typeWork}`);
    if (this.zayavka.typeWork) {
      this.tmpWorkers = this.tmpWorkers.filter(workers => workers.typeWork === this.zayavka.typeWork);
      this.tmpMasters = [...this.masters, ...this.dispatchersMasters];
      this.tmpMasters = this.tmpMasters.filter(masters => !masters.typeWork ? masters : masters.typeWork === this.zayavka.typeWork);
    }
  }

  creationOfZayavka() {
    this.dataHandlerService.addNewZayavka(this.zayavka);
    this.zayavka = new Zayavka();
  }

  openContentsDialog() {
    let dialogRef = this.dialog.open(ContentsDialogComponent, {
      width: '700px !important',
      height: '60%', data: [this.zayavka.typeWork, this.zayavka.kindWork, this.zayavka.services], autoFocus: false
    });

    let timeArray: number[] = [];

    dialogRef.afterClosed().subscribe(result => {
        if (result) {
          console.log(result[1]);
          this.zayavka.services = [];
          result[0].forEach((r: { name: string; }) => this.zayavka.services.push(r.name));
          this.zayavka.time = result[1];
          this.zayavka.price = result[2];
        }

      }
    );
  }

  openCitizenInfoDialog() {
    console.log(this.dataHandlerService.citizenInfoList);
    let dialogRef = this.dialog.open(CitizenInfoDialogComponent, {
      width: '700px !important',
      height: '60%', data: [this.zayavka.houseGuid, this.zayavka.flatNum, this.dataHandlerService.citizenInfoSubject.getValue()], autoFocus: false
    });

    let timeArray: number[] = [];

    dialogRef.afterClosed().subscribe(result => {
        if (result) {
          console.log(result);
          this.zayavka.phone = result.phone;
          this.zayavka.email = result.email !== undefined && result.email !== null && result.email !== '' ? result.email : '';
          this.zayavka.fioSecondary = result.fioSecondary !== undefined && result.fioSecondary !== null && result.fioSecondary !== '' ? result.fioSecondary : '';
          this.zayavka.fioOwner = result.fioOwner !== undefined && result.fioOwner !== null && result.fioOwner !== '' ? result.fioOwner : '';
          console.log(this.zayavka);
        }
      }
    );
  }
}
