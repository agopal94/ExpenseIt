import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BootstrapService {

  constructor(private http: HttpClient) {
  }

  bootStrapApp(): Observable<any> {
    return this.http.get(environment.apiUrls.bootstrap);
  }

  createNewDatabase(): Observable<any> {
    return this.http.get(environment.apiUrls.createNewDB);
  }

}
