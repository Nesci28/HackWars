import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  tsOptions: any;

  form: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(private authService: AuthService, private router: Router) {}

  get username() {
    return this.form.get('username');
  }
  get password() {
    return this.form.get('password');
  }

  async ngOnInit(): Promise<void> {
    this.tsOptions = (await import('./login.tsparticles')).tsOptions;
  }

  async login(): Promise<void> {
    if (this.form.valid) {
      this.authService
        .login(this.username.value, this.password.value)
        .subscribe(
          (res) => {
            localStorage.setItem('authorization', res.data);
            this.router.navigate(['/dashboard']);
          },
          (_) => {}
        );
    }
  }
}
