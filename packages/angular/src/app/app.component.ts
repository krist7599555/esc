import { Component } from "@angular/core";

import { AuthService } from "./auth.service";
import { BookService } from "./book.service";
import { TimeService } from "./times.service";
import { RoomService } from "./room.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  constructor(
    public auth: AuthService,
    public room: RoomService,
    public book: BookService,
    public days: TimeService
  ) {}
}
