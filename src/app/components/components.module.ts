import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';

import { DonutComponent } from './donut/donut.component';
import { IncreasingComponent } from './increasing/increasing.component';
import { ModalImgComponent } from './modal-img/modal-img.component';


@NgModule({
  declarations: [
    IncreasingComponent,
    DonutComponent,
    ModalImgComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ChartsModule
  ],
  exports: [
    IncreasingComponent,
    DonutComponent,
    ModalImgComponent
  ]
})
export class ComponentsModule { }
