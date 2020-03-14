import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KDatePickerComponent } from './k-date-picker/k-date-picker.component';
import { DateFormatPipe } from '../pipe/date_format.pipe';



@NgModule({
  declarations: [KDatePickerComponent, DateFormatPipe],
  imports:      [
    CommonModule
  ]
})
export class UiModule { }
