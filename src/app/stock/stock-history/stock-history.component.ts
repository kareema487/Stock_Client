import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { IStock } from 'src/app/models/stock';
import { StockService } from '../stock.service';

@Component({
  selector: 'app-stock-history',
  templateUrl: './stock-history.component.html',
  styleUrls: ['./stock-history.component.css']
})
export class StockHistoryComponent implements OnInit {

  stockSymbol: string = '';
  stocks: IStock[] = []
  connection: HubConnection;
  selectedStock: IStock | null = null;
  constructor(private route: ActivatedRoute, private stockService: StockService) {
    this.connection = new HubConnectionBuilder()
      .withUrl(`https://localhost:7255/stockHub`)
      .build();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      // Access route parameters here
      this.stockSymbol = params['symbol'];
    });
    this.startConnection();

    this.stockService.GetStockHistory(this.stockSymbol).subscribe({
      next: (result: IStock[] | any) => {
        this.stocks = result;
      },
      error: (error: any) => console.log(error)

    });

  }
  public startConnection(): void {
    this.connection.start()
      .then(() => {
        console.log('Connected to SignalR hub');
    this.joinGroup();
    this.connection.on('UpdateStockHistory', (stock: IStock) => {
          this.stocks.push(stock);
        });
      })
      .catch((err: any) => {
        console.log(err);
      });
  }
  public joinGroup(){
    this.connection.invoke('JoinGroup', this.stockSymbol)
      .catch(err => console.error(`Error joining group ${this.stockSymbol}:`, err));
  }

  stopConnection(): void {
    // Stop the SignalR connection
    this.connection.stop();
  }

  ngOnDestroy(): void {
    this.stopConnection();
  }

}
