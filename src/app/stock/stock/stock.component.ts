import { Component, OnDestroy, OnInit } from '@angular/core';
import { StockService } from '../stock.service';
import { IStock } from 'src/app/models/stock';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit,OnDestroy {
  stocks :IStock[]=[]
  connection: HubConnection;
  selectedStock:IStock|null = null;
  constructor(private stockService:StockService){
    this.connection = new HubConnectionBuilder()
    .withUrl(`https://localhost:7255/stockHub`)
    .build();
    this.startConnection();

}
  ngOnDestroy(): void {
    this.stopConnection();
  }

public startConnection(): void {
  this.connection.start()
    .then(() => {
      console.log('Connected to SignalR hub');
      this.connection.on('CreateStock', (stock: IStock) => {
        this.stocks.push(stock);
      });
      this.connection.on('UpdateStock', (stock: IStock) => {
        const index = this.stocks.findIndex(item => item.symbol === stock.symbol);
        if(index !== -1){
          this.stocks[index]={ ...this.stocks[index], ...stock };
        }

      });
    })
    .catch((err:any) => {
      console.log(err);
    });
}

stopConnection(): void {
  // Stop the SignalR connection
  this.connection.stop();
}
  ngOnInit(): void {
    this.stockService.GetStocks().subscribe({
      next: (result:IStock[]|any)=>{
        this.stocks = result;
      },
      error: (error:any)=>console.log(error)
      
    });
  }

  updateSymbol(stock:IStock|null){
    this.selectedStock = stock
  }


}
