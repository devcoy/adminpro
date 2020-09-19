import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncreasingComponent } from './increasing/increasing.component';

import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [IncreasingComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [ IncreasingComponent ]
})
export class ComponentsModule { }
