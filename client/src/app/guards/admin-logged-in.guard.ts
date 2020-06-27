import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { NgLocalization } from '@angular/common';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminLoggedInGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/']);
      // return false;
    }

    if (this.authService.isAdmin() && this.isAdminPanelRoute()) {
      this.router.navigate(['/admin/dashboard']);
    }

    if (!this.authService.isAdmin() && this.isAdminDashboardRoute()) {
      this.router.navigate(['/']);
      // return false;
    }

    return true;
  }

  isAdminPanelRoute(): boolean {
    return location.href.toLowerCase().includes('adminpanel');
  }

  isAdminDashboardRoute(): boolean {
    return location.href.toLowerCase().includes('admin/dashboard');
  }
}
