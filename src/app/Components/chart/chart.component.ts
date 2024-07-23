import { Component, Input } from '@angular/core';
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

  ngOnInit() {
    this.chartParentWidth = (this.chartParentWidth-100) / 2;
    this.view = [this.chartParentWidth, this.chartParentHeight+100];
    this.xAxisLabel = this.xAxis;
    this.yAxisLabel = this.yAxis;

  }
}
