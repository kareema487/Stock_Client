import { Component } from '@angular/core';
import { AccountService } from './core/account/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'StockExchange';
  constructor(private accountService:AccountService){

  }
  ngOnInit(): void {
    this.loadCurrentUser();
  }
  loadCurrentUser(){
    const token = localStorage.getItem('token');
      this.accountService.loadCurrentUser(token)!.subscribe({
        next: ()=>console.log("loaded user",),
        error: error => console.log(error)
      });
  }
}
