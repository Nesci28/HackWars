import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class LeaderboardService {
  constructor(private httpClient: HttpClient) {}

  getLeaderboard(): Observable<any> {
    return this.httpClient.get(`${environment.url}/leaderboard`);
  }

  getUserProfile(userId: string): Observable<any> {
    return this.httpClient.get(
      `${environment.url}/leaderboard/profile?p=${userId}`
    );
  }
}
