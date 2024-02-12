import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StockService } from '../stock.service';
import { IStock } from 'src/app/models/stock';

@Component({
  selector: 'app-stock-form',
  templateUrl: './stock-form.component.html',
  styleUrls: ['./stock-form.component.css']
})
export class StockFormComponent implements OnChanges{
  @ViewChild('closeModal') closeModal: ElementRef | any;
  @Input() stock: IStock | null = null;
  stockForm: FormGroup;
  error="";

  constructor(private fb: FormBuilder, private stockService: StockService) {
    
    this.stockForm = this.fb.group({
      price: [this.stock?.price, [Validators.required, Validators.min(0.01)]],
      symbol: [this.stock?.symbol, Validators.required]
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.stockForm = this.fb.group({
      price: [this.stock?.price, [Validators.required, Validators.min(0.01)]],
      symbol: [this.stock?.symbol, Validators.required]
    });
  }
  onSubmit(): void {
    if (this.stock == null) {
      this.stockService.create(this.stockForm.value).subscribe(
        {
          next: () => this.closeModal.nativeElement.click(),
          error: (err) => this.error=err.error
        }
      );
    }else{
      this.stockService.update(this.stockForm.value).subscribe(
        {
          next: () => this.closeModal.nativeElement.click(),
          error: (err) => this.error=err.error
        }
      );
    }

    // formData.append('name', this.brandForm.get('name')!.value);


  }
}
