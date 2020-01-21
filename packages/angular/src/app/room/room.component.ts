import { Component, OnInit } from "@angular/core";
import { RoomService } from "../room.service";
import * as dayjs from "dayjs";
import "dayjs/locale/th";
dayjs.locale("th");
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import * as _ from "lodash";

import { finalize } from "rxjs/operators";

@Component({
  selector: "app-room",
  templateUrl: "./room.component.html",
  styleUrls: ["./room.component.scss"]
})
export class RoomComponent implements OnInit {
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
    "ค่ายจิตอาสาปรับปรุงโรงเรียนร่วมกับนักเรียนต่างชาติ",
  ]
  public organizationList = [
  ]

  get times() {
    return _.flatMap(_.range(8, 20), nm => [nm + ":00", nm + ":30"]);
  }
  get rooms() {
    return [
      { label: "ห้องประชุม 2 (10 คน)", value: "pj2" },
      { label: "ห้องประชุม 3 (10 คน)", value: "pj3" },
      { label: "ห้องประชุม 4 (10 คน)", value: "pj4" },
      { label: "ห้องประขุม กวศ (20 คน)", value: "esc" },
      { label: "ห้องประชุม ใหญ่ (40 คน)", value: "big" }
    ];
  }

  constructor(public roomService: RoomService, private fb: FormBuilder) {}

  ngOnInit() {
    const now = dayjs().startOf('hour')
    this.reserveForm = this.fb.group({
      date: [null, [Validators.required]],
      start: [now.format('H:mm'), Validators.required],
      end: [now.add(1, 'hour').format('H:mm'), Validators.required],
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
      this.roomService.reserve(this.reserveForm.value).subscribe(
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
}
