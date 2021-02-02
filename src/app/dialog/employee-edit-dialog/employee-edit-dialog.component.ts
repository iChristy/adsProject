import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DataHandlerService} from '../../services/data-handler.service';
import {User} from '../../classes/User';

@Component({
  selector: 'app-employee-edit-dialog',
  templateUrl: './employee-edit-dialog.component.html',
  styleUrls: ['./employee-edit-dialog.component.css']
})
export class EmployeeEditDialogComponent implements OnInit {

  title: string = '';
  fieldTitle: string = '';
  fieldName: string = '';
  fieldValue: string = '';
  masters: User[] = [];
  workers: User[] = [];
  tmpSelect: User[] = [];
  typeWork: string | undefined = '';

  constructor(private dialogRef: MatDialogRef<EmployeeEditDialogComponent>,
              @Inject(MAT_DIALOG_DATA) private data: [string, string, string, string, string],
              private dataHandler: DataHandlerService) {
  }


  ngOnInit(): void {
    this.title = this.data[0];
    this.fieldTitle = this.data[1];
    this.fieldName = this.data[2];
    this.fieldValue = this.data[3];
    this.typeWork = this.data[4] ? this.data[4] : undefined;

    if (this.fieldName === 'masterId') {
      this.masters = this.dataHandler.masters.getValue().concat(this.dataHandler.dispatchersMasters.getValue());
    }

    if (this.fieldName === 'workerId') {
      this.dataHandler.workers.subscribe(workers => this.workers = workers);
    }

    this.tmpSelect = this.masters ? this.masters.filter(m => m.role === 'master' ? m.typeWork === this.typeWork : m) : this.workers.filter(w => w.typeWork === this.typeWork);
  }


  onConfirm() {
    this.dialogRef.close(this.fieldValue);
  }

  onCancel() {
    this.dialogRef.close(null);
  }

}
