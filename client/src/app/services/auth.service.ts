import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  jwtHelper = new JwtHelperService();

  constructor(private httpClient: HttpClient) {}

  isAuthenticated(): boolean {
    const token = this.getToken();
    return !this.jwtHelper.isTokenExpired(token);
  }

  getToken(): string {
    return localStorage.getItem('authorization');
  }

  verificationInviteCode(inviteCode: string): Observable<any> {
    return this.httpClient.post(`${environment.url}/verification`, {
      inviteCode,
    });
  }

  signup(inviteCode, username, email, password): Observable<any> {
    return this.httpClient.post(`${environment.url}/auth/signup`, {
      inviteCode,
      username,
      email,
      password,
    });
  }

  login(username: string, password: string): Observable<any> {
    return this.httpClient.post(`${environment.url}/auth/login`, {
      username,
      password,
    });
  }
}
