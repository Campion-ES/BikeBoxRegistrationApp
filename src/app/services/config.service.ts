import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private configUrl = 'assets/config.json';
  private config: any;

  constructor(private http: HttpClient) {}

  loadConfig(): Observable<any> {
    return this.http.get(this.configUrl).pipe(tap((config) => (this.config = config)));
  }

  getConfig(): any {
    return this.config;
  }
}
