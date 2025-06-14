import { NgModule } from '@angular/core';
import { RouteReuseStrategy } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { PageHeader } from './custom-elements/custom-app-header/page-header';
import { FTButtonComponent } from './custom-elements/custom-button-design/ft-button.component';
import { FTTextAreaComponent } from './custom-elements/custom-text-area/ft-text-area.component'
import { FTBottomTabsComponent } from './custom-elements/custom-bottom-tabs/ft-bottom-tabs.component';


@NgModule({
  declarations: [
    PageHeader,
    FTButtonComponent,
    FTTextAreaComponent,
    FTBottomTabsComponent
  ],
  imports: [
    IonicModule.forRoot(),
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
     RouterModule
  ],
  exports: [
    PageHeader,
    FTButtonComponent,
    FTTextAreaComponent,
    FTBottomTabsComponent
  ],
  providers: [{ 
    provide: RouteReuseStrategy, useClass: IonicRouteStrategy }]
})
export class SharedModule {}
