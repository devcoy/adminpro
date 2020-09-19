import { Component } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: [ './progress.component.css' ]
})
export class ProgressComponent {

  progressOne: number = 25;
  progressTwo: number = 35;

  get getProgress1() {
    return `${this.progressOne}%`;
  }

  get getProgress2() {
    return `${this.progressTwo}%`;
  }
}
