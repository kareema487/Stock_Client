import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StockComponent } from './stock/stock.component';
import { StockHistoryComponent } from './stock-history/stock-history.component';

const routes: Routes = [
  {path:'',component: StockComponent},
  {path:'history/:symbol',component:StockHistoryComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StockRoutingModule { }
