import { Component } from '@angular/core';
import { User } from '../interface/user';
import { Store, select } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { nickname, login } from '../store/user/user.selector';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  /** DATA */
   user$:Observable<string>;
   user:string;
   isLogin$:Observable<boolean>;
   isLogin:boolean;
   gradient:number;

   /** CONSTRUCTOR  */
   constructor(private store: Store <{ userStore: User }>, private router: Router){
    this.user$ = this.store.pipe(
      select('userStore'),
      map(state => nickname(state))
    )

    this.isLogin$ = this.store.pipe(
      select('userStore'),
      map(state => login(state))
    )

    // Detects changes in url
    // We use .pipe() to transform data
    this.router.events.pipe(
      // We filter the navigation event that interests us
      filter((event: any) => event instanceof NavigationEnd)
      // We subscribe to it
    ).subscribe((_value: NavigationEnd) => {
      this.gradient = Math.floor(Math.random() * 40 + 20);
      console.log(this.gradient);
      console.log('linear-gradient(90deg, rgba(254,210,219,1) ' + this.gradient +'%, rgb(103, 58, 183) 100%)');
    })
   };

   /** METHODS */
   ngOnInit() {
    this.user$.subscribe((user) => (
      this.user = user
    )
    );

    this.isLogin$.subscribe((value) => (
      this.isLogin = value
    ));
  }
}
