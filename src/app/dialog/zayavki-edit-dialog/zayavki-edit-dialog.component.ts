import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DataHandlerService} from '../../services/data-handler.service';
import {User} from '../../classes/User';

@Component({
  selector: 'app-zayavki-edit-dialog',
  templateUrl: './zayavki-edit-dialog.component.html',
  styleUrls: ['./zayavki-edit-dialog.component.css']
})
export class ZayavkiEditDialogComponent implements OnInit {
  title: string = '';
  fieldTitle: string = '';
  fieldName: string = '';
  fieldValue: string = '';


  constructor(
    private dialogRef: MatDialogRef<ZayavkiEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: [string, string, string, string],
    private dataHandler: DataHandlerService) { }

  ngOnInit(): void {
    this.title = this.data[0];
    this.fieldTitle = this.data[1];
    this.fieldName = this.data[2];
    this.fieldValue = this.data[3];

  }

  onConfirm() {
    this.dialogRef.close(this.fieldValue);
  }

  onCancel() {
    this.dialogRef.close(null);
  }
}
