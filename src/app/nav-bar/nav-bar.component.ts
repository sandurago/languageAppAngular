import { Component, HostListener, SimpleChange } from '@angular/core';
import { User } from '../Interface/user';
import { Store, select } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { id, name, login, username } from '../Store/user/user.selector';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { logout } from '../Store/user/user.actions';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  @HostListener('window:beforeunload', [ '$event'])
  unloadHandler(event:void) {
    this.logout();
  }
   name$:Observable<string>;
   name:string;
   username$:Observable<string>;
   username:string;
   isLogin$:Observable<boolean>;
   isLogin:boolean;
   userId$:Observable<number>;
   userId:number;

   constructor(private store: Store <{ userStore: User }>, private router: Router){
    this.username$ = this.store.pipe(
      select('userStore'),
      map(state => username(state))
    );

    this.name$ = this.store.pipe(
      select('userStore'),
      map(state => name(state))
    );

    this.isLogin$ = this.store.pipe(
      select('userStore'),
      map(state => login(state))
    );

    this.userId$ = this.store.pipe(
      select('userStore'),
      map(state => id(state))
    )
   };

   async logout() {
    const response = await fetch('http://localhost:5000/user/logout', {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'Application/json',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({
        'id': this.userId,
        'name': this.name,
        'username': this.username,
      }),
    });

    const status = await response.status;
    const json = await response.json();

    if (status === 200 || status === 201) {
      this.store.dispatch(logout());
      this.router.navigate(['/']);
    }
   }

   ngOnInit() {
    this.name$.subscribe((name) => (
      this.name = name
    ));

    this.username$.subscribe((username) => (
      this.username = username
    ))

    this.isLogin$.subscribe((login) => (
      this.isLogin = login
    ));

    this.userId$.subscribe((id) => (
      this.userId = id
    ));
  }
}

