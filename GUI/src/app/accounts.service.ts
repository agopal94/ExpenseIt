import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../environments/environment';
import { Account, AccountDB } from './models';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  availableAccounts: AccountDB[] = [];

  constructor(private http: HttpClient) {
  }

  getAllAccounts(): Observable<any> {
    return this.http.get(environment.apiUrls.getAllAccounts).pipe(map((res: any) => {
      this.availableAccounts = res;
      return res;
    }))
  }

  createNewAccount(newAcc: Account): Observable<any> {
    return this.http.post(environment.apiUrls.createAccount, newAcc);
  }

}
