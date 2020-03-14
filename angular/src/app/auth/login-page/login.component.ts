import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { AuthService } from '../state/auth.service';
import { ToastrService } from 'ngx-toastr';
import { AuthQuery } from '../state/auth.query';

@Component({
  selector:    'app-login',
  templateUrl: './login.component.html',
  styleUrls:   ['./login.component.scss'],
})
export class LoginComponent {

  submitted = false
  loginForm: FormGroup = this.build.group({
    username: [null, Validators.required],
    password: [null, Validators.required],
  })
  loading$ = this.authQuery.selectLoading()

  constructor(private auth: AuthService,
              private authQuery: AuthQuery,
              private build: FormBuilder,
              private router: Router,
              private toastr: ToastrService
  ) { }

  get f() {
    return this.loginForm.controls
  }

  onSubmit() {
    this.submitted = true
    if (this.loginForm.valid) {
      this.auth
        .login({
          username: this.loginForm.value.username,
          password: this.loginForm.value.password
        })
        .subscribe(
          () => {
            this.router.navigateByUrl('/');
            this.toastr.success('login success')
          },
          err => {
            this.toastr.error(err.error.message)
          },
        )
    } else {
      this.toastr.error("form is invalid")
    }
  }
}
