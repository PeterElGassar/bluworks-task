import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/@core/data/User';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrlPrefix = environment.baseUrl;
  currentUserSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  currentUser$ = this.currentUserSubject.asObservable();
  //properties
  getCurrentUserValue() {
    return this.currentUserSubject.value;
  }

  constructor(private http: HttpClient) { }

  Login(val: any) {
    return this.http.post(`${this.apiUrlPrefix}auth/login`, val).pipe(
      map((user: any) => {
        if (user) {
          localStorage.setItem('token', user.token);
          localStorage.setItem('userInfo', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }
      })
    );
  }


  loadCurrentUser() {
    let user: any = localStorage.getItem('userInfo');
    this.currentUserSubject.next(user);
  }

}
