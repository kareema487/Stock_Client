import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IOrder } from 'src/app/models/order';
import { OrderService } from '../order.service';
import { StockService } from 'src/app/stock/stock.service';
import { IStock } from 'src/app/models/stock';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent {
  @Output() dataModified: EventEmitter<boolean> = new EventEmitter<boolean>();
  @ViewChild('closeModal') closeModal: ElementRef | any;
  @Input() order: IOrder | null = null;
  orderForm: FormGroup;
  error="";
  orderTypes:string[]=["Buy","Sell"];
  stocks:IStock[]|any=[]
  constructor(private fb: FormBuilder, private orderService: OrderService,private stockService:StockService) {
    
    this.orderForm = this.fb.group({
      symbol: [this.order?.symbol, Validators.required],
      quantity: [this.order?.quantity, [Validators.required,Validators.min(1)]],
      orderType:[this.order?.orderType,Validators.required]
    });
    this.stockService.GetStocks().subscribe({
      next:(result)=> this.stocks=result
    })
  }
  onSubmit(): void {
    if (this.order == null) {
      this.orderService.create(this.orderForm.value).subscribe(
        {
          next: () => {this.closeModal.nativeElement.click();this.dataModified.emit(true);},
          error: (err) => this.error=err.error
        }
      );
    }

  }
}
