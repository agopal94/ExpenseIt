import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { CategoryDB } from './models';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  public availableCategories: CategoryDB[] = [];

  constructor(private http: HttpClient) {
  }

  public getAllCategories() {
    return this.http.get(environment.apiUrls.getAllCategories).pipe(map((r: any) => {
      this.availableCategories = r;
      return this.availableCategories;
    }));
  }

  public createNewCategory(catValue: string) {
    return this.http.post(environment.apiUrls.createCategory, {cat: catValue})
  }

}
