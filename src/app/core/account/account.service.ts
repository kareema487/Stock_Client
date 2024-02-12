import { Injectable } from '@angular/core';
import { ReplaySubject, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IUser } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private currentUserSource = new ReplaySubject<IUser | null>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient,private router:Router) { }

  loadCurrentUser(token:string|null){
     let headers = new HttpHeaders();
     
     headers = headers.set("Authorization",`Bearer ${token}`);
     
     return this.http.get(this.baseUrl + 'Users',{headers}).pipe(
      map((user:IUser|any)=>{
        if(user){
          localStorage.setItem('token',user.token);
          this.currentUserSource.next(user);
        }
      })
     )
  }

  login(values: any) {
    return this.http.post(this.baseUrl + 'Users/login', values).pipe(
      map((user: IUser | any) => {
        if (user) {
          localStorage.setItem('token', user.token);
          this.currentUserSource.next(user);
        }
      })
    )
  }

  register(values: any) {
    return this.http.post(this.baseUrl + 'Users/register',values).pipe(
      map((user:IUser|any)=>{
        if(user){
          localStorage.setItem('token',user.token);
          this.currentUserSource.next(user);
        }
      })
    )
  }

  logout(){
    localStorage.removeItem('token');
    this.currentUserSource.next(null);
    this.router.navigateByUrl('/account/login');
  }

  checkEmailExists(email:string){
    return this.http.get(this.baseUrl + 'Users/emailexists?email='+email);
  }
}
