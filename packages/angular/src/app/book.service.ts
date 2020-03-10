import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { BehaviorSubject } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class BookService {
  public readonly books$ = new BehaviorSubject<any[]>([]);

  constructor(private http: HttpClient) {
    this.http
      .get("/api/books")
      .pipe(tap(data => this.books$.next(data as any)))
      .subscribe();
  }

  reserve(form) {
    console.log("TCL: BookService -> reserve -> form", form);
    return this.http.post("/api/books", form);
  }
}
