import { Component, HostListener } from '@angular/core';
import { User } from '../Interface/user';
import { Store, select } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { id, name, login, username } from '../Store/user/user.selector';
import { Router } from '@angular/router';
import { logout } from '../Store/user/user.actions';
import { UserService } from '../User/login/create-user.service';

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

   constructor(
    private store: Store <{ userStore: User }>,
    private router: Router,
    private userService: UserService){
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

    const result = await this.userService.logout(this.userId, this.name, this.username);

    if (result.user !== null) {
      this.store.dispatch(logout());
      this.router.navigate(['/']);
    }
   }

   ngOnInit():void {
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

