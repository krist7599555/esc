import { Component, OnInit, Input, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { EventEmitter } from "@angular/core";

import "dayjs/locale/th";
import * as dayjs from "dayjs";

import * as _ from "lodash";

import { AuthService } from "../../auth.service";
import { BookService } from "../../book.service";
import { RoomService } from "../../room.service";
import { TimeService } from "../../times.service";

@Component({
  selector: "app-bookingform",
  templateUrl: "./bookingform.component.html",
  styleUrls: ["./bookingform.component.scss"]
})
export class BookingformComponent implements OnInit {
  // public dayjs: any = dayjs;
  // public showContent: any = {};
  // public showForm = false;

  // public reserveForm: FormGroup;
  // public loading = false;
  // public submitted = false;
  // public finished = false;
  // public errorMessage = "";

  // public showProjectList = true;
  // public showOrganizationList = true;

  // public projectList = [
  //   "โครงการ / กิจกรรมที่ต้องการ",
  //   "กิจกรรมรับน้อง 2562",
  //   "วิทยุเสียงตามสายวิศวกรรมศาสตร์ ภาคต้น ปีการศึกษา 2562",
  //   "ฝ่ายกิจการภายใน กวศ.",
  //   "ฝ่ายกิจการภายนอก กวศ.",
  //   "ฝ่ายวิรัชกิจ กวศ.",
  //   "ฝ่ายสนับสนุน กวศ.",
  //   "ฝ่ายพัฒนาองค์กร กวศ.",
  //   "ค่ายลานเกียร์ ครั้งที่ 19",
  //   "ค่ายยุววิศวกรบพิธ ครั้งที่ 48",
  //   "ค่ายวิศวพัฒน์",
  //   "ค่ายจิตอาสาปรับปรุงโรงเรียนร่วมกับนักเรียนต่างชาติ"
  // ];
  // public organizationList = [];

  // _active = true;

  @Input() active = true;
  @Output() activeChange = new EventEmitter();

  // 2 way data biding
  setActive(val) {
    this.active = !!val;
    this.activeChange.emit(this.active);
  }

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private books: BookService,
    public times: TimeService,
    public rooms: RoomService
  ) {
    // this.activeChange = new EventEmitter();
  }
  bookingform: FormGroup = null;
  ngOnInit() {
    const default_booking = this.times.default_bookingtimes();
    // const room = _.sample(this.rooms.rooms$.value) || {};
    // console.log("TCL: BookingformComponent -> ngOnInit -> room", room);
    this.bookingform = this.formBuilder.group({
      date: [default_booking.date, [Validators.required]],
      start: [default_booking.start, Validators.required],
      end: [default_booking.end, Validators.required],
      organization: [null, [Validators.required]],
      description: null,
      room: [null, Validators.required]
    });
    console.log(
      "TCL: BookingformComponent -> ngOnInit -> this.bookingform",
      this.bookingform.controls
    );
  }

  onSubmit() {
    // this.submitted = true;
    if (this.bookingform.valid) {
      // this.loading = true;
      this.books.reserve(this.bookingform.value).subscribe(
        data => {
          // this.loading = false;
          // this.finished = true;
          setTimeout(() => {
            // window.location.reload();
          }, 3000);
        },
        err => {
          // this.loading = false;
          // this.errorMessage = err.error;
        }
      );
    }
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
    this.rooms.updateStatus(id, el.value).subscribe(
      () => {
        parClass.remove("is-loading");
        window.location.reload();
      },
      console.error,
      () => {}
    );
  }
  openForm() {
    if (this.auth.isAuthed()) {
      // this.showForm = true;
    } else {
      window.open("/login", "_blank");
    }
  }
}
