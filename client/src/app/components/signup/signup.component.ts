import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  tsOptions: any;
  showHint: boolean = false;
  welcomeBanner: boolean = false;
  errorBanner: boolean = false;
  step1: boolean = false;

  form: FormGroup = new FormGroup({
    inviteCode: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(private authService: AuthService, private router: Router) {}

  get inviteCode() {
    return this.form.get('inviteCode');
  }
  get username() {
    return this.form.get('username');
  }
  get email() {
    return this.form.get('email');
  }
  get password() {
    return this.form.get('password');
  }

  async ngOnInit(): Promise<void> {
    this.tsOptions = (await import('./signup.tsparticles')).tsOptions;
  }

  async signup(): Promise<void> {
    this.errorBanner = false;
    this.welcomeBanner = false;

    if (!this.welcomeBanner && this.inviteCode.valid) {
      this.authService.verificationInviteCode(this.inviteCode.value).subscribe(
        (_) => {
          this.welcomeBanner = true;
          this.inviteCode.disable();
          this.step1 = true;
        },
        (_) => {
          this.errorBanner = true;
        }
      );
    } else if (this.step1 && this.form.valid) {
      this.authService
        .signup(
          this.inviteCode.value,
          this.username.value,
          this.email.value,
          this.password.value
        )
        .subscribe(
          (res) => {
            localStorage.setItem('authorization', res.data);
            this.router.navigate(['/dashboard']);
          },
          (_) => {
            this.errorBanner = true;
          }
        );
    }
  }
}
