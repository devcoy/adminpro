import { Component } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: [ './progress.component.css' ]
})
export class ProgressComponent {

  progressValue: number = 40;

  get getProcentaje() {
    return `${this.progressValue}%`;
  }

  changeValue(value: number) {

    if(this.progressValue >= 100 && value >= 0) {
      return this.progressValue = 100;
    }
    if(this.progressValue <= 0 && value < 0) {
      return this.progressValue = 0;
    }
    return this.progressValue = this.progressValue + value;
  }

}
