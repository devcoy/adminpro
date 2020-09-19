import { Component, OnInit } from '@angular/core';

import { MultiDataSet, Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-graphics1',
  templateUrl: './graphics1.component.html',
  styles: [
  ]
})
export class Graphics1Component {
  
  // Doughnut
  public doughnutChartLabels: Label[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public doughnutChartData: MultiDataSet = [
    [350, 450, 100]
  ];
  public colors: Color[] = [
    {
      backgroundColor: [ '#6857e6', '#009fee', '#f02059']
    }
  ];

}