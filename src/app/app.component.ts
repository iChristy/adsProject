import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  opened: boolean = true;
  events: string[] = [];

  onOpenedChange(opened: boolean): void {
    this.opened = opened;
  }
}
