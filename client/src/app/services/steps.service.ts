import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StepsService {
  constructor(private httpClient: HttpClient) {}

  isStepDone(stepNumber: string): Observable<any> {
    return this.httpClient.get(`${environment.url}/steps?s=${stepNumber}`);
  }

  stepDone(stepNumber: string, text: string): Observable<any> {
    return this.httpClient.post(`${environment.url}/steps`, {
      stepNumber,
      text,
    });
  }
}
