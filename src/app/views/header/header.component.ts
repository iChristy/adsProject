import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() opened: boolean = true;

  @Output() openedChange = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onOpenedChange(): void {
    this.opened = !this.opened;
    this.openedChange.emit(this.opened);
  }

}
