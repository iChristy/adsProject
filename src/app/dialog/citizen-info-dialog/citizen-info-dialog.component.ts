import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CitizenInfo} from '../../classes/CitizenInfo';
import {Flats} from '../../classes/Flats';

class Flat {
}

@Component({
  selector: 'app-citizen-info-dialog',
  templateUrl: './citizen-info-dialog.component.html',
  styleUrls: ['./citizen-info-dialog.component.css']
})
export class CitizenInfoDialogComponent implements OnInit {

  tmpHouseGuid: string = '';
  tmpFlatNum: string = '';
  flats: Flats[];
  tmpFlat: Flats | undefined;
  citizenInfo: CitizenInfo[] = [];

  constructor(private dialogRef: MatDialogRef<CitizenInfoDialogComponent>,
              @Inject(MAT_DIALOG_DATA) private data: [string, string, [CitizenInfo[]]]) {
  }

  ngOnInit(): void {
    console.log(this.data);
    this.tmpHouseGuid = this.data[0];
    this.tmpFlatNum = this.data[1];
    this.data[2].forEach(data => data.map(d => {
        if (d.houseGuid === this.tmpHouseGuid && d.flatNum === this.tmpFlatNum) {
          this.citizenInfo.push(d);
        };
      }
    ))
    // data.filter( info => info.houseGuid === this.tmpHouseGuid && info.flatNum === this.tmpFlatNum) ));
    // console.log(a);
    // this.citizenInfo = this.data[2].filter(info => info.houseGuid === this.tmpHouseGuid && info.flatNum === this.tmpFlatNum);
  }

  checkInfo(info: CitizenInfo) {
    this.dialogRef.close(info);
  }
}
