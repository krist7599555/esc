import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";

import { AuthService } from "../auth.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  constructor(public auth: AuthService, private router: Router) {}

  ngOnInit() {
    // this.router.routeReuseStrategy.shouldReuseRoute = () => true;
  }

  @Input() fullheight = false;
  @Input() navigation = true;
  openNav = false;
}
