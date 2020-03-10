import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import "dayjs/locale/th";
import * as dayjs from "dayjs";

import * as _ from "lodash";

import { AuthService } from "../auth.service";
import { BookService } from "../book.service";
import { RoomService } from "../room.service";
import { TimeService } from "../times.service";

dayjs.locale("th");

@Component({
  selector: "app-room",
  templateUrl: "./room.component.html",
  styleUrls: ["./room.component.scss"]
})
export class RoomComponent implements OnInit {
  public bookingFormActive = true;

  public dayjs: any = dayjs;
  public showContent: any = {};
  public showForm = false;

  public reserveForm: FormGroup;
  public loading = false;
  public submitted = false;
  public finished = false;
  public errorMessage = "";

  public showProjectList = true;
  public showOrganizationList = true;

  public projectList = [
    "โครงการ / กิจกรรมที่ต้องการ",
    "กิจกรรมรับน้อง 2562",
    "วิทยุเสียงตามสายวิศวกรรมศาสตร์ ภาคต้น ปีการศึกษา 2562",
    "ฝ่ายกิจการภายใน กวศ.",
    "ฝ่ายกิจการภายนอก กวศ.",
    "ฝ่ายวิรัชกิจ กวศ.",
    "ฝ่ายสนับสนุน กวศ.",
    "ฝ่ายพัฒนาองค์กร กวศ.",
    "ค่ายลานเกียร์ ครั้งที่ 19",
    "ค่ายยุววิศวกรบพิธ ครั้งที่ 48",
    "ค่ายวิศวพัฒน์",
    "ค่ายจิตอาสาปรับปรุงโรงเรียนร่วมกับนักเรียนต่างชาติ"
  ];
  public organizationList = [];

  get times() {
    return _.flatMap(_.range(8, 20), nm => [nm + ":00", nm + ":30"]);
  }

  constructor(
    public roomService: RoomService,
    private fb: FormBuilder,
    private auth: AuthService,
    private bookService: BookService,
    public day: TimeService
  ) {}

  ngOnInit() {
    const now = dayjs().startOf("hour");
    this.reserveForm = this.fb.group({
      date: [null, [Validators.required]],
      start: [now.format("H:mm"), Validators.required],
      end: [now.add(1, "hour").format("H:mm"), Validators.required],
      organization: [null, [Validators.required]],
      description: null,
      room: [null, Validators.required]
    });
  }
  weekday(date) {
    return dayjs(date).day();
  }

  onSubmit() {
    this.submitted = true;
    if (this.reserveForm.valid) {
      this.loading = true;
      this.bookService.reserve(this.reserveForm.value).subscribe(
        data => {
          this.loading = false;
          this.finished = true;
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        },
        err => {
          this.loading = false;
          this.errorMessage = err.error;
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
    this.roomService.updateStatus(id, el.value).subscribe(
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
      this.showForm = true;
    } else {
      window.open("/login", "_blank");
    }
  }
}
