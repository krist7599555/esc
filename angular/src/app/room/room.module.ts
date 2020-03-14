import { NgModule                         } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule                     } from '@angular/common';
import { RoomComponent                    } from './room-page/room.component';
import { RecordComponent                  } from './record-item/record.component';
import { BookingformComponent             } from './booking-form/bookingform.component';
import { PipeModule                       } from '../pipe/pipe.module';
import { MapComponent } from './map/map.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [
    RoomComponent,
    RecordComponent,
    BookingformComponent,
    MapComponent,
  ],
  imports: [
    FontAwesomeModule,
    CommonModule,
    PipeModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class RoomModule { }
