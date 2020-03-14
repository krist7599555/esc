import { Component, Input, forwardRef } from '@angular/core';
import { faRestroom, faPrint, faCubes, faDharmachakra, faChessRook, faFireAlt, faArrowsAltV, faUser } from '@fortawesome/free-solid-svg-icons'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
@Component({
  selector:    'app-map',
  templateUrl: './map.component.html',
  styleUrls:   ['./map.component.scss'],
  providers:   [
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    {provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => MapComponent), multi: true}
  ]
})
export class MapComponent implements ControlValueAccessor {
  faRestroom = faRestroom;
  faPrint = faPrint;
  faCubes = faCubes;
  faDharmachakra = faDharmachakra;
  faChessRook = faChessRook;
  faArrowsAltV = faArrowsAltV;
  faFireAlt = faFireAlt;
  faUser = faUser;

  @Input() value: string = null
  @Input() disabled = false;

  onChange: (value: string) => void;
  onTouched: (value: string) => void;

  select(room) {
    this.value = room;
    this.onChange(room)
  }

  writeValue(value: string) {
    console.log('write value')
    this.value = value || null;
  }
  registerOnChange(fn)  {this.onChange  = fn;}
  registerOnTouched(fn) {this.onTouched = fn;}

}

