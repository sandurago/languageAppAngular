import { ChangeDetectorRef, Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})

export class ChartComponent {
  @Input() chartParentWidth:number;
  @Input() chartParentHeight:number;


  data = [
    {
      "name": "1 Jul",
      "value": 23
    },
    {
      "name": "2 Jul",
      "value": 5
    },
    {
      "name": "3 Jul",
      "value": 43
    },
    {
      "name": "4 Jul",
      "value": 78
    },
    {
      "name": "5 Jul",
      "value": 12
    },
    {
      "name": "6 Jul",
      "value": 120
    },
    {
      "name": "7 Jul",
      "value": 93
    },
  ];

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
  yAxisLabel = 'Minutes';
  showGridLines = false;
  barPadding = 20;

  ngOnInit() {
    this.chartParentWidth = (this.chartParentWidth-100) / 2;
    this.view = [this.chartParentWidth, this.chartParentHeight+100];
    // console.log(this.chartParentHeight);
  }

  // ngAfterContentInit() {
  //   console.log(this.chart);
  // }

  // ngAfterContentChecked() {
  //   this.cdref.detectChanges();
  // }
}
