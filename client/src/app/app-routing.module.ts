import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoggedInGuard } from './guards/logged-in.guard';
import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';
import { JwtActiveGuard } from './guards/jwt-active.guard';
import { AdminComponent } from './components/admin/admin.component';
import { AdminLoggedInGuard } from './guards/admin-logged-in.guard';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';

const routes: Routes = [
  {
    path: 'adminPanel',
    component: AdminComponent,
    canActivate: [AdminLoggedInGuard],
  },
  {
    path: 'admin/dashboard',
    component: AdminDashboardComponent,
    canActivate: [AdminLoggedInGuard],
  },
  { path: 'leaderboard', component: LeaderboardComponent },
  { path: 'login', component: LoginComponent, canActivate: [JwtActiveGuard] },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [LoggedInGuard],
  },
  { path: '**', component: SignupComponent, canActivate: [JwtActiveGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
