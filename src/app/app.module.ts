import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ZayavkiTableComponent} from './views/zayavki-table/zayavki-table.component';
import {MatTableModule} from '@angular/material/table';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {HeaderComponent} from './views/header/header.component';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MenuComponent} from './views/menu/menu.component';
import {MatPaginatorIntl, MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {ZayavkiAdditionComponent} from './views/zayavki-addition/zayavki-addition.component';
import {getPaginatorIntl} from './translatePag' ;
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatInputModule} from '@angular/material/input';
import {RouterModule} from '@angular/router';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {registerLocaleData} from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import {DateDisplayPipe} from './pipe/date-display.pipe';
import {ContentsDialogComponent} from './dialog/contents-dialog/contents-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {ZayavkiCurrentComponent} from './views/zayavki-current/zayavki-current.component';
import {ZayavkiEditDialogComponent} from './dialog/zayavki-edit-dialog/zayavki-edit-dialog.component';
import {ConfirmDialogComponent} from './dialog/confirm-dialog/confirm-dialog.component';
import {CitizenInfoDialogComponent} from './dialog/citizen-info-dialog/citizen-info-dialog.component';
import {CancelDialogComponent} from './dialog/cancel-dialog/cancel-dialog.component';
import {EmployeeEditDialogComponent} from './dialog/employee-edit-dialog/employee-edit-dialog.component';
import {DisconnectionsComponent} from './views/disconnections/disconnections.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MAT_DATE_LOCALE, MatNativeDateModule} from '@angular/material/core';
import {DisconnectionAdditionDialogComponent} from './dialog/disconnection-addition-dialog/disconnection-addition-dialog.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {LoginComponent} from './views/login/login.component';
import {MatMenuModule} from '@angular/material/menu';
import {CookieService} from 'ngx-cookie-service';
import {RestInterceptorService} from './services/rest-interceptor.service';

registerLocaleData(localeRu);

@NgModule({
  declarations: [
    AppComponent,
    ZayavkiTableComponent,
    HeaderComponent,
    MenuComponent,
    ZayavkiAdditionComponent,
    DateDisplayPipe,
    ContentsDialogComponent,
    ZayavkiCurrentComponent,
    ZayavkiEditDialogComponent,
    ConfirmDialogComponent,
    CitizenInfoDialogComponent,
    CancelDialogComponent,
    EmployeeEditDialogComponent,
    DisconnectionsComponent,
    DisconnectionAdditionDialogComponent,
    LoginComponent
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
    MatSortModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatStepperModule,
    MatInputModule,
    HttpClientModule,
    MatSelectModule,
    MatButtonToggleModule,
    MatDialogModule,
    ScrollingModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTooltipModule,
    MatMenuModule
    // DragDropModule
  ],
  providers: [{provide: MatPaginatorIntl, useValue: getPaginatorIntl()}, {
    provide: MAT_DATE_LOCALE,
    useValue: 'ru-RU'
  }, MatDatepickerModule, CookieService,
    {provide: HTTP_INTERCEPTORS, useClass: RestInterceptorService, multi: true}],
  bootstrap: [AppComponent],
  entryComponents: [
    ContentsDialogComponent
  ]
})
export class AppModule {
}
