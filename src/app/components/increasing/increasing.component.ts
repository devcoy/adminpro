import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-increasing',
  templateUrl: './increasing.component.html',
  styles: [
  ]
})
export class IncreasingComponent implements OnInit {
  ngOnInit() {
    this.btnClass = `btn ${this.btnClass}`;
  }

  @Input('value') progressValue: number = 40; // renombar argumento esperado del padre
  @Input() btnClass: string = 'btn-primary';


  @Output() outputValue: EventEmitter<number> = new EventEmitter();


  changeValue(value: number) {

    if(this.progressValue >= 100 && value >= 0) {
      this.outputValue.emit(100);
      return this.progressValue = 100;
    }
    if(this.progressValue <= 0 && value < 0) {
      this.outputValue.emit(0);
      return this.progressValue = 0;
    }
    this.outputValue.emit(this.progressValue);
    return this.progressValue = this.progressValue + value;
  }

}
