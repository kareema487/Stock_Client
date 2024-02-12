import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StockRoutingModule } from './stock-routing.module';
import { StockComponent } from './stock/stock.component';
import { StockFormComponent } from './stock-form/stock-form.component';
import { SharedModule } from '../shared/shared.module';
import { StockHistoryComponent } from './stock-history/stock-history.component';


@NgModule({
  declarations: [
    StockComponent,
    StockFormComponent,
    StockHistoryComponent
  ],
  imports: [
    CommonModule,
    StockRoutingModule,
    SharedModule
  ],
  exports:[
    StockComponent
  ]
})
export class StockModule { }
