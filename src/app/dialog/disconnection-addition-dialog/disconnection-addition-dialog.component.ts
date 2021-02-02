import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DataHandlerService} from '../../services/data-handler.service';
import {Houses} from '../../classes/Houses';
import {TypeWork} from '../../classes/TypeWork';
import {Disconnection} from '../../classes/Disconnection';

@Component({
  selector: 'app-disconnection-addition-dialog',
  templateUrl: './disconnection-addition-dialog.component.html',
  styleUrls: ['./disconnection-addition-dialog.component.css']
})
export class DisconnectionAdditionDialogComponent implements OnInit {
  typeOfDialog: string = 'add';
  tmpHouse: string = '';
  tmpType: string = '';
  tmpComment: string = '';
  tmpInitiator: string = '';
  tmpDateStart: Date = new Date();
  tmpDateEnd: Date = new Date();
  tmpTimeStart: string = '';
  tmpTimeEnd: string = '';
  tmpAddress: string = '';
  houses: Houses[] = [];
  types: TypeWork[] = [];
  tmpDisconnection?: Disconnection = new Disconnection(0, '', '', ['',''], '', '', '');

  constructor(
    private dialogRef: MatDialogRef<DisconnectionAdditionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: [{ disconnection?: Disconnection }, { houses: Houses[] }, { types: TypeWork[] }],
    private dataHandler: DataHandlerService) {
  }

  ngOnInit(): void {
    if (this.data[0]) {
      this.typeOfDialog = 'update';
      this.tmpDateStart = this.dataHandler.formatStringToDate(this.data[0].disconnection!.interval[0].split(' ')[0]);
      console.log(this.tmpDateStart);
      this.tmpDateEnd =  this.dataHandler.formatStringToDate(this.data[0].disconnection!.interval[1].split(' ')[0]);
      this.tmpTimeStart = this.data[0].disconnection!.interval[0].split(' ')[1];
      this.tmpTimeEnd = this.data[0].disconnection!.interval[1].split(' ')[1];
      this.tmpHouse = this.data[0].disconnection!.houseGuid;
      this.tmpComment = this.data[0].disconnection!.comment;
      this.tmpType = this.data[0].disconnection!.typeWork;
      this.tmpInitiator = this.data[0].disconnection!.initiator;
    }

    this.houses = this.data[1].houses;
    this.types = this.data[2].types;
  }

  onConfirmClose() {
    let strDateStart = '';
    let strDateEnd = '';
    console.log(this.tmpDateStart.toDateString());
    console.log(strDateStart= this.dataHandler.formatOfDiscDate(this.dataHandler.formatDateToString(this.tmpDateStart)) +' '+this.tmpTimeStart);
    console.log(strDateEnd = this.dataHandler.formatOfDiscDate(this.dataHandler.formatDateToString(this.tmpDateEnd)) +' '+this.tmpTimeEnd);
    this.tmpAddress = this.houses.find(house => this.tmpHouse === house.houseGuid)!.address;
    this.tmpDisconnection = new Disconnection(0, this.tmpComment, this.tmpHouse, [strDateStart, strDateEnd], this.tmpType, this.tmpInitiator, this.tmpAddress);
    console.log(this.tmpDisconnection);
    if (this.typeOfDialog === 'update') {
      this.dialogRef.close([this.tmpDisconnection, 'update']);
    }
    else {
      this.dialogRef.close([this.tmpDisconnection, 'add']);
    }
  }


}
