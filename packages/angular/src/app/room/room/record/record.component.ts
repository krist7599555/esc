import { Component, OnInit, Input, Output } from '@angular/core';
import { RoomService } from '../../../room.service';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-room-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.scss']
})
export class RecordComponent implements OnInit {

  @Input() ngModel: any;
  @Output() ngModelChange: EventEmitter = new EventEmitter();

  showContent = false;

  constructor(public roomService: RoomService) {}

  ngOnInit() {
  }


  status2Class(status) {
    return (
      {
        waiting: "is-warning",
        approved: "is-success",
        rejected: "is-danger"
      }[status] || ""
    );
  }

  changeStatus(id, event) {
    const el: HTMLSelectElement = event.target;
    const parClass = el.parentElement.classList;
    parClass.add("is-loading");
    this.roomService.updateStatus(id, el.value).subscribe(
      () => {
        parClass.remove("is-loading");
        window.location.reload();
      },
      console.error,
      () => {}
    );
  }
}
