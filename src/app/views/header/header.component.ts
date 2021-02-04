import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DataHandlerService} from '../../services/data-handler.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() opened: boolean = true;
  @Output() setEntry = new EventEmitter();
  @Output() openedChange = new EventEmitter();

  constructor(private dataHandlerService: DataHandlerService) { }

  ngOnInit(): void {
  }

  onOpenedChange(): void {
    this.opened = !this.opened;
    this.openedChange.emit(this.opened);

  }

  checkWs() {
    this.dataHandlerService.sendNewZayavka();
  }

  exit() {
    this.setEntry.emit(true);
  }

}
