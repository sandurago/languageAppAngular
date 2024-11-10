import { Component, ElementRef, Input } from '@angular/core';
import { LegendPosition } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})

export class ChartComponent {
  @Input() chartParentWidth:number;
  @Input() chartParentHeight:number;
  @Input() chartType:string;
  @Input() xAxis:string;
  @Input() yAxis:string;
  @Input() data: Array<{ name: string, value: number }>;

  //chart
  view: any = [];
  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showLegendPie = true;
  showGridLines = true;
  showXAxisLabel = true;
  xAxisLabel = '';
  showYAxisLabel = true;
  yAxisLabel = '';
  barPadding = 20;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: LegendPosition = LegendPosition.Right;
  scheme = 'natural';

  initialWindowWidth: number = window.innerWidth;
  windowWidth: number = window.innerWidth;;
  windowWidthAfterResize: number;
  isResponsive: boolean = false;

  // In `hostElement` there will be the actual HTML container of our component.
  // constructor(private hostElement: ElementRef) {
  // }

  onResize(event:any):void {
    this.windowWidthAfterResize = event.target.innerWidth;
    let difference;

    if (this.windowWidthAfterResize > 1024) {
      if (this.windowWidth > this.windowWidthAfterResize) {
        difference = (this.windowWidth - this.windowWidthAfterResize) / 2;
        this.chartParentWidth = this.chartParentWidth - difference;
        this.windowWidth = this.windowWidthAfterResize;
      } else {
        if (this.isResponsive) {
          this.chartParentWidth = (this.chartParentWidth - 100) / 2;
          difference = (this.windowWidthAfterResize - this.windowWidth) / 2;
          this.chartParentWidth = this.chartParentWidth + difference;
          this.windowWidth = this.windowWidthAfterResize;
          this.isResponsive = false;

        } else {
          difference = (this.windowWidthAfterResize - this.windowWidth) / 2;
          this.chartParentWidth = this.chartParentWidth + difference;
          this.windowWidth = this.windowWidthAfterResize;
        }
      }
    } else {
      this.chartParentWidth = this.windowWidthAfterResize - 100;
      this.windowWidth = this.windowWidthAfterResize;
      this.isResponsive = true;
    }
    this.view = [this.chartParentWidth, this.chartParentHeight];

    // const { offsetHeight, offsetWidth } = this.hostElement.nativeElement.parentNode
    // this.view = [offsetWidth, offsetHeight - 100];
  }

  ngOnInit():void {
    this.chartParentWidth = this.chartParentWidth > 1024 ? ((this.chartParentWidth-100) / 2) : (this.chartParentWidth-100);
    this.view = [this.chartParentWidth, this.chartParentHeight+100];
    this.xAxisLabel = this.xAxis;
    this.yAxisLabel = this.yAxis;
  }
}
