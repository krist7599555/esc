import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'
import { AuthService } from '../state/auth.service';

@Component({
  selector:    'app-profile',
  templateUrl: './profile.component.html',
  styleUrls:   ['./profile.component.scss'],
})
export class ProfileComponent {
  submitted = false
  loginForm: FormGroup
  errorMessage = ''

  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: [null, Validators.required],
      password: [null, Validators.required],
    })
  }

  get f() {
    return this.loginForm.controls
  }


  // validateAllFormFields(formGroup: FormGroup) {         //{1}
  //   Object.keys(formGroup.controls).forEach(field => {  //{2}
  //     const control = formGroup.get(field);             //{3}
  //     if (control instanceof FormControl) {             //{4}
  //       control.markAsTouched({ onlySelf: true });
  //     } else if (control instanceof FormGroup) {        //{5}
  //       this.validateAllFormFields(control);            //{6}
  //     }
  //   });
  // }

  onSubmit() {
    this.submitted = true
    this.errorMessage = ''
    if (this.loginForm.valid) {
      this.auth
        .login({
          username: this.loginForm.value.username,
          password: this.loginForm.value.password
        })
        .subscribe(
          () => this.router.navigateByUrl('/'),
          err => (this.errorMessage = err.error)
        )
    } else {
      console.log('form invalid')
      // this.validateAllFormFields(this.loginForm); //{7}
    }
  }
}
