import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { map } from 'rxjs';
import { Transaction } from './models';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  public allTransactions: Transaction[] = [];

  constructor(private http: HttpClient) {
  }

  public getAllTransactions() {
    return this.http.get(environment.apiUrls.getAllTransactions).pipe(map((r: any) => {
      this.allTransactions = r;
      return this.allTransactions;
    }))
  }

  public addTransaction(newTransaction: Transaction) {
    return this.http.post(environment.apiUrls.createTransaction, newTransaction);
  }

}
