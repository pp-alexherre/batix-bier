import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TplMainNavComponent } from './_templates/tpl-main-nav/tpl-main-nav.component';
import { TplOverlayComponent } from './_templates/tpl-overlay/tpl-overlay.component';

import { PageDashboardComponent } from './_pages/page-dashboard/page-dashboard.component';
import { SectionChartComponent } from './_sections/section-chart/section-chart.component';
import { TplUploadFormComponent } from './_templates/tpl-upload-form/tpl-upload-form.component';
import { TplDeleteFormComponent } from './_templates/tpl-delete-form/tpl-delete-form.component';
import { TplSideBarComponent } from './_templates/tpl-side-bar/tpl-side-bar.component';
import { TplSideBarItemComponent } from './_templates/tpl-side-bar/tpl-side-bar-item/tpl-side-bar-item.component';
import { TplWorkProgressComponent } from './_templates/tpl-work-progress/tpl-work-progress.component';
import { LoadingInterceptor } from './_interceptor/loading.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    TplMainNavComponent,
    PageDashboardComponent,
    TplOverlayComponent,
    SectionChartComponent,
    TplUploadFormComponent,
    TplDeleteFormComponent,
    TplSideBarComponent,
    TplSideBarItemComponent,
    TplWorkProgressComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ChartsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: LoadingInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
