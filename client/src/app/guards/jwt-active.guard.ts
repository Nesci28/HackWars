import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class JwtActiveGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  async canActivate(): Promise<boolean | undefined> {
    if (!this.authService.isAuthenticated()) {
      return true;
    }

    const res = await this.authService.checkJWT().toPromise();
    if (res.statusCode === 200) {
      this.router.navigate(['/dashboard']);
    }
  }
}
