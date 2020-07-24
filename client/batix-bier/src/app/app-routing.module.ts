import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageDashboardComponent } from './_pages/page-dashboard/page-dashboard.component';

const routes: Routes = [
  {path: '', pathMatch:'full', component: PageDashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
