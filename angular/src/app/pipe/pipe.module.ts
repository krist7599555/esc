import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateFormatPipe } from './date_format.pipe';



@NgModule({
  declarations: [DateFormatPipe],
  imports:      [CommonModule],
  exports:      [DateFormatPipe]
})
export class PipeModule { }
