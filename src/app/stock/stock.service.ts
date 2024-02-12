import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  GetStocks(){
     return this.http.get(this.baseUrl + 'Stocks');
  }
  GetStockHistory(symbol:string){
    return this.http.get(this.baseUrl + `Stocks/${symbol}/history`);
  }

  create(values: any) {
    return this.http.post(this.baseUrl + 'Stocks', values);
  }
  update(values: any) {
    return this.http.put(this.baseUrl + 'Stocks', values);
  }
}
