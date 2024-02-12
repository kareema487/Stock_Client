import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }
  GetOrders(){
    return this.http.get(this.baseUrl + 'Orders');
 }
 create(values: any) {
   return this.http.post(this.baseUrl + 'Orders', values);
 }
}
