import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginComponent } from './login-page/login.component';
import { ProfileComponent } from './profile-page/profile.component';
import { HttpClientModule } from '@angular/common/http';
import { IsLoggedInDirective } from './is-logged-in.directive';

@NgModule({
  exports:      [IsLoggedInDirective],
  declarations: [IsLoggedInDirective, LoginComponent, ProfileComponent],
  imports:      [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],

})
export class AuthModule {
}
