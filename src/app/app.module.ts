import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ZayavkiTableComponent } from './views/zayavki-table/zayavki-table.component';
import {MatTableModule} from '@angular/material/table';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {FormsModule} from '@angular/forms';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { HeaderComponent } from './views/header/header.component';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import { MenuComponent } from './views/menu/menu.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';

@NgModule({
  declarations: [
    AppComponent,
    ZayavkiTableComponent,
    HeaderComponent,
    MenuComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatTableModule,
        MatSidenavModule,
      MatCheckboxModule,
      FormsModule,
      MatListModule,
      MatIconModule,
      MatButtonModule,
      MatCardModule,
      MatDividerModule,
      MatPaginatorModule,
      MatSortModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
