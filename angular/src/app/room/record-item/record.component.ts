import { Component, Input, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { gsap } from 'gsap'
import { Reservation } from '../state/model';
import { ReservationService } from '../state/reservations.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector:    'app-record',
  templateUrl: './record.component.html',
  styleUrls:   ['./record.component.scss'],
})
export class RecordComponent implements AfterViewInit, OnDestroy {
  @Input() value: Reservation;
  @ViewChild("detail") detailEl: ElementRef;
  private tween: gsap.core.Tween;

  constructor(private reservationService: ReservationService,
              private toast: ToastrService) { }

  ngAfterViewInit() {
    const el = this.detailEl.nativeElement;
    this.tween = gsap.from(el, { height: 0 });
    this.tween.reverse();
  }
  ngOnDestroy() {
    console.log('destroy', this)
  }

  private visibleDetail = false;
  toggleVisibleDetail() {
    if (this.tween.reversed()) {
      this.tween.play();
    } else {
      this.tween.reverse();
    }
  }

  handleChangeStatus(status: Reservation["status"]) {
    console.log(status, this.value.id)
    this.reservationService.adminChangeStatus(this.value.id, status).subscribe(
      () => this.toast.success("update reservation success"),
      () => this.toast.error("update reservation fail")
    )
  }
}
