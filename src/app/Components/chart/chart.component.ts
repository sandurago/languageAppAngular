import { ChangeDetectorRef, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { Day } from 'src/app/Interface/days';
import { User } from 'src/app/Interface/user';
import { loginDays } from 'src/app/Store/user/user.selector';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})

export class ChartComponent {
  @Input() chartParentWidth:number;
  @Input() chartParentHeight:number;

  loginDays$:Observable<Array<Day>>;

  constructor(private store: Store<{userStore: User}>){
    this.loginDays$ = this.store.pipe(
      select('userStore'),
      map(state => loginDays(state))
    )
  };

  data: Array<{ name: string, value: number }> = [];

  view: any = [];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  shodGridLines = false;
  showXAxisLabel = true;
  xAxisLabel = 'Days';
  showYAxisLabel = true;
  yAxisLabel = 'Time (in minutes)';
  showGridLines = false;
  barPadding = 20;

  ngOnInit() {
    this.chartParentWidth = (this.chartParentWidth-100) / 2;
    this.view = [this.chartParentWidth, this.chartParentHeight+100];

    this.loginDays$.subscribe((days) => {
      this.data = days.map((day) => ({
        name: day.date,
        value: day.minutes,
      }))
    })
  }
}
