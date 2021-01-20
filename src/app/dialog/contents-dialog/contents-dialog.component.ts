import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DataHandlerService} from '../../services/data-handler.service';
import {Content} from '../../classes/Content';

@Component({
  selector: 'app-contents-dialog',
  templateUrl: './contents-dialog.component.html',
  styleUrls: ['./contents-dialog.component.css']
})
export class ContentsDialogComponent implements OnInit {

  contents: Content[];
  checkContents: Content[] = [];
  checkContentsDisplay: [];
  tmpContents: Content[];
  price: string;
  time: string;

  constructor(
    private dialogRef: MatDialogRef<ContentsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: [string, string, string[]],
    private dataHandler: DataHandlerService) {
  }

  ngOnInit(): void {
    // @ts-ignore
    this.contents = this.dataHandler.getContentList(this.data[0], this.data[1]);
    this.contents = this.contents.sort((c1, c2) => c1.name.localeCompare(c2.name));
    this.tmpContents = this.contents;
    console.log(this.data);
    this.checkContents = [];
    if (this.data[2] !== null && this.data[2] !== undefined && this.data[2][0] !== '') {
      this.data[2].forEach(
        contentName => {
          console.log(contentName);
          this.checkContents.push(<Content> this.contents.find(c =>
            c.name.trim().toUpperCase() === contentName.trim().toUpperCase()
          ));
        }
      );
    }
    ;
  }

  displayContents() {
    this.price = '0';
    this.time = '0';
    let timeArray: number[] = [];
    this.checkContents.forEach(cc => {
      this.price = cc.price !== '' && cc.price !== null && cc.price !== undefined ? (parseInt(this.price) + parseInt(cc.price)).toString() : this.price;
      console.log(this.time);
      cc.time !== '' && cc.time !== null && cc.time !== undefined ? timeArray.push(parseInt(cc.time)) : timeArray.push(0);
    });
    console.log(timeArray);
    this.time = timeArray !== [] ? Math.max.apply(null, timeArray).toString() : '0';
    console.log(`${this.price} - ${this.time}`);
  }

  onConfirm() {
    console.log(`${this.price} - ${this.time}`);
    this.dialogRef.close([this.checkContents, this.time, this.price]);
  }
}
