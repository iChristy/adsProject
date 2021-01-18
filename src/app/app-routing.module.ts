import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ZayavkiTableComponent} from './views/zayavki-table/zayavki-table.component';
import {ZayavkiAdditionComponent} from './views/zayavki-addition/zayavki-addition.component';

const routes: Routes = [{
  path: 'adsTable',
  component: ZayavkiTableComponent
},
  {
    path: 'adsAdd',
    component: ZayavkiAdditionComponent
  },
  {
    path: '',
    redirectTo: '/adsTable',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/adsTable',
    pathMatch: 'full'
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {




}
