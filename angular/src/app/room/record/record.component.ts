import { Component, OnInit, Input } from "@angular/core";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-record",
  templateUrl: "./record.component.html",
  styleUrls: ["./record.component.scss"]
})
export class RecordComponent implements OnInit {
  @Input("value") value;
  faCoffee = faCoffee;
  constructor() {}

  ngOnInit(): void {}
}
