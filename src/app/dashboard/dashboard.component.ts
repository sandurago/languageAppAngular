import { ChangeDetectorRef, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { LastTasks, User } from '../Interface/user';
import { Store, select } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { name, lastLogin, loginDays, login, previousTasks } from '../Store/user/user.selector';
import { Day } from '../Interface/days';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent {
  user$: Observable<string>;
  user: string;
  isLogin$: Observable<boolean>;
  isLogin: boolean;
  chartParentWidth: number;
  chartParentHeight: number;
  lastLogin$: Observable<string>;
  lastLogin: string;
  loginDays$: Observable<Array<Day>>;
  data: Array<{ name: string, value: number }> = [];
  dataSource$: Observable<Array<LastTasks>>;
  dataSource: Array<LastTasks>;
  displayedColumns: Array<string> = ['date', 'name', 'score'];

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
    this.dataSource$ = this.store.pipe(
      select('userStore'),
      map(state => previousTasks(state))
    )
  };


  ngAfterContentInit():void {
    this.chartParentWidth = this.chart.nativeElement.offsetWidth;
    this.chartParentHeight = this.chart.nativeElement.offsetHeight;
  }

  ngAfterContentChecked():void {
    this.cdref.detectChanges();
  }

  ngOnInit():void {
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

    this.dataSource$.subscribe((data) => {
      this.dataSource = data;
    })
  };
}
