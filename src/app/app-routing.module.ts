import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {path:'account',loadChildren:()=> import('./core/account/account.module').then(mod =>mod.AccountModule)},
  {path:'',canActivate:[authGuard],loadChildren:()=> import('./stock/stock.module').then(mod =>mod.StockModule)},
  {path:'order',canActivate:[authGuard],loadChildren:()=> import('./order/order.module').then(mod =>mod.OrderModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
