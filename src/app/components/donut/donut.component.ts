import { Component, Input } from '@angular/core';

import { MultiDataSet, Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-donut',
  templateUrl: './donut.component.html',
  styles: [
  ]
})
export class DonutComponent {

  @Input() title: string;
  
  // Doughnut
  @Input('labels') doughnutChartLabels: Label[] = ['Data 1', 'Data 2', 'Data 3s'];
  @Input('data') doughnutChartData: MultiDataSet = [
    [350, 450, 100]
  ];
  public colors: Color[] = [
    {
      backgroundColor: [ '#6857e6', '#009fee', '#f02059']
    }
  ];
}
