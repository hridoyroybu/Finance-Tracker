import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomePage } from './home/home.page';
import { TreeRootComponent } from './finance-tracking-tree/tree-root';
import { TransactionDetailsFormComponent } from './tansactioon-details/tansactioon-details.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomePage },
  { path: 'transaction-details', component: TransactionDetailsFormComponent },
  { path: 'finance-tree', component: TreeRootComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
