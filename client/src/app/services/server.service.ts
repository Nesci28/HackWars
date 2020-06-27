import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ServerService {
  constructor(private httpClient: HttpClient) {}

  getServerStatus(status: string): Observable<any> {
    return this.httpClient.get(`${environment.url}/user/server?s=${status}`);
  }

  setServerStatus(status: string): Observable<any> {
    return this.httpClient.post(`${environment.url}/user/server`, { status });
  }
}
