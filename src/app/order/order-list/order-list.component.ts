import { Component } from '@angular/core';
import { IOrder } from 'src/app/models/order';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent {
  orders :IOrder[]=[]
  selectedOrder:IOrder|null = null;
  constructor(private orderService:OrderService){}
  ngOnInit(): void {
    this.updateOrderList(null);
  }
  updateOrderList(event:any){
    this.orderService.GetOrders().subscribe({
      next: (result:IOrder[]|any)=>{
        this.orders = result;
        console.log(result);
        
      },
      error: (error:any)=>console.log(error)
      
    });
  }
  updateOrder(order:IOrder|null){
    this.selectedOrder = order
  }
}
