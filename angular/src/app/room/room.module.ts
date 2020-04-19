import { NgModule                         } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule                     } from '@angular/common';
import { RoomComponent                    } from './index/room.component';
import { RecordComponent                  } from './record-item/record.component';
import { BookingformComponent             } from './booking-form/bookingform.component';
import { PipeModule                       } from '../pipe/pipe.module';
import { MapComponent } from './map/map.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    RoomComponent,
    RecordComponent,
    BookingformComponent,
    MapComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    PipeModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class RoomModule { }
