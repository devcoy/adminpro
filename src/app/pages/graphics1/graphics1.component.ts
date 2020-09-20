import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-graphics1',
  templateUrl: './graphics1.component.html',
  styles: [
  ]
})
export class Graphics1Component {

  title1: string = 'Ventas';
  labels1: string[] = ['E-Commcerce', 'En sitio', 'En sucursal'];
  data1: any[] = [
    [20, 20, 60]
  ];

}