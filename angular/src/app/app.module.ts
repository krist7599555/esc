import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { TokenInterceptor } from "./token.interceptor";

import { ClubComponent } from "./club/club.component";
import { ContactComponent } from "./contact/contact.component";
import { FooterComponent } from "./footer/footer.component";
import { HeaderComponent } from "./header/header.component";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { NotfoundComponent } from "./notfound/notfound.component";
import { ProfileComponent } from "./profile/profile.component";
import { RoomComponent } from "./room/room.component";
import { StudentComponent } from "./student/student.component";
import { BookingformComponent } from "./room/bookingform/bookingform.component";
import { KDatePickerComponent } from "./k-date-picker/k-date-picker.component";
import { DateFormatPipe } from "./pipe/date_format.pipe";
import { RecordComponent } from "./room/record/record.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    HomeComponent,
    LoginComponent,
    NotfoundComponent,
    HeaderComponent,
    RoomComponent,
    ClubComponent,
    ContactComponent,
    FooterComponent,
    StudentComponent,
    BookingformComponent,
    KDatePickerComponent,
    DateFormatPipe,
    RecordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  exports: [DateFormatPipe],
  bootstrap: [AppComponent]
})
export class AppModule {}
