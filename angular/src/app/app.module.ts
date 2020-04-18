import "./app.initialize"

import { CommonModule } from '@angular/common'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { ToastrModule } from 'ngx-toastr'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { AuthModule } from './auth/auth.module'
import { PipeModule } from './pipe/pipe.module'
import { RoomModule } from './room/room.module'
import { ShellModule } from './shell/shell.module'
import { TokenInterceptor } from './http.token.interceptor'

@NgModule({
  bootstrap:    [AppComponent],
  declarations: [AppComponent],
  imports:      [
    RoomModule,
    AuthModule,
    PipeModule,
    FormsModule,
    ShellModule,
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
})
export class AppModule {}
