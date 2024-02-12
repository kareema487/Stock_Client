import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/models/user';
import { AccountService } from '../account/account.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  currentUser$:Observable<IUser | null>;
  constructor(private accountService:AccountService){
    this.currentUser$ = this.accountService.currentUser$;
  }

  ngOnInit(){

  }

  logout(){
    this.accountService.logout();
  }
}
