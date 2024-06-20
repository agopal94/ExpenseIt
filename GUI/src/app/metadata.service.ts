import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { MetadataDB } from './models';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MetadataService {

  public availableMetadata: MetadataDB[] = [];

  constructor(private http: HttpClient) {
  }

  public getAllMetadata() {
    return this.http.get(environment.apiUrls.getAllMetadata).pipe(map((r: any) => {
      this.availableMetadata = r;
      return this.availableMetadata;
    }));
  }

  public createNewMetadata(key: string, value: string) {
    return this.http.post(environment.apiUrls.createMetadata, {key, value})
  }

}
