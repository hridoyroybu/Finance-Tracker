import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';

import { HomePage } from './home/home.page';

import { TransactionDetailsFormComponent } from './tansactioon-details/tansactioon-details.component';
import { TreeRootComponent } from './finance-tracking-tree/tree-root';
import { TreeNodeComponent } from './finance-tracking-tree/tree-node/tree-node';
import { TreeBranchComponent } from './finance-tracking-tree/tree-branch/tree-branch';
import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    HomePage,
    AppComponent,
    TransactionDetailsFormComponent,
    TreeRootComponent,
    TreeNodeComponent,
    TreeBranchComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(),
    AppRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  
  providers: [
    provideHttpClient(), 
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
