import { ChangeDetectorRef, Component, ElementRef } from '@angular/core';
import { User } from '../Interface/user';
import { Store, select } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { name, lastLogin, loginDays, login } from '../Store/user/user.selector';
import { Day } from '../Interface/days';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent {
  user$: Observable<string>;
  user: string;
  isLogin$:Observable<boolean>;
  isLogin:boolean;
  chartParentWidth:number;
  chartParentHeight:number;
  lastLogin$: Observable<string>;
  lastLogin: string;
  loginDays$:Observable<Array<Day>>;
  data: Array<{ name: string, value: number }> = [];

  constructor(
    private store: Store<{userStore: User}>,
    private chart: ElementRef,
    private cdref: ChangeDetectorRef
  ){
    this.user$ = this.store.pipe(
      select('userStore'),
      map(state => name(state))
    )
    this.isLogin$ = this.store.pipe(
      select('userStore'),
      map(state => login(state))
    )
    this.lastLogin$ = this.store.pipe(
      select('userStore'),
      map(state => lastLogin(state))
    )
    this.loginDays$ = this.store.pipe(
      select('userStore'),
      map(state => loginDays(state))
    )
  };

  ngAfterContentInit() {
    this.chartParentWidth = this.chart.nativeElement.offsetWidth;
    this.chartParentHeight = this.chart.nativeElement.offsetHeight;
  }

  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }

  ngOnInit() {
    this.user$.subscribe((user) => {
      this.user = user;
    })

    this.isLogin$.subscribe((login) => {
      this.isLogin = login;
    })

    this.lastLogin$.subscribe((lastLogin) => {
      this.lastLogin = lastLogin;
    })

    this.loginDays$.subscribe((days) => {
      this.data = days.map((day) => ({
        name: day.date,
        value: day.minutes,
      }))
    })
  };
}
