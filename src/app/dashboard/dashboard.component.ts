import { Component } from '@angular/core';
import { User } from '../Interface/user';
import { Store, select } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { name } from '../store/user/user.selector';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  user$: Observable<string>;
  user: string;
  //helloAlienIcon: string = "../icons/green-alien-hello.svg";

  constructor(private store: Store<{userStore: User}>){
    this.user$ = this.store.pipe(
      select('userStore'),
      map(state => name(state))
    )
  };

  ngOnInit() {
    this.user$.subscribe((user) => {
      this.user = user;
    })
  };
}
