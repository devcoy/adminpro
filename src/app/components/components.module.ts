import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';

import { DonutComponent } from './donut/donut.component';
import { IncreasingComponent } from './increasing/increasing.component';


@NgModule({
  declarations: [
    IncreasingComponent,
    DonutComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ChartsModule
  ],
  exports: [ 
    IncreasingComponent,
    DonutComponent  
  ]
})
export class ComponentsModule { }
