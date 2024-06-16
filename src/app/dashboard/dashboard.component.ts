import { ChangeDetectorRef, Component, ElementRef } from '@angular/core';
import { User } from '../Interface/user';
import { Store, select } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { name } from '../Store/user/user.selector';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent {
  user$: Observable<string>;
  user: string;
  chartParentWidth:number;
  chartParentHeight:number;


  constructor(private store: Store<{userStore: User}>, private chart: ElementRef, private cdref: ChangeDetectorRef){
    this.user$ = this.store.pipe(
      select('userStore'),
      map(state => name(state))
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
  };
}
