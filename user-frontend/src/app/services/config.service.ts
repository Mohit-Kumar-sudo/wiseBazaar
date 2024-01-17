import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  configUrl = 'assets/config.json';
  config: any;
  constructor(private http: HttpClient) { this.setConfig() }
  
  getConfig() {
    return this.http.get<Observable<any>>(this.configUrl);
  }

  setConfig() {
    this.getConfig()
      .subscribe(resp => {
        this.config = resp
      });
  }
}
