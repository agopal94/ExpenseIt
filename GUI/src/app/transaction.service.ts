import { Injectable } from '@angular/core';
import { Transaction } from './app.models';
import * as uuid from 'uuid';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private allTransactions: Transaction[] = [];
  private allCategories: string[] = [];

  constructor(private http: HttpClient) {
  }

  public getAllTransactions(): Observable<any> {
    return this.http.get("/api/v1/api/transaction/getall").pipe(map((r: any) => {
      this.allTransactions = r;
      return this.allTransactions;
    }));
  }

  public addTransaction(newTransaction: Transaction) {
    newTransaction.guid = uuid.v4();
    return this.http.post("/api/v1/api/transaction", newTransaction, httpOptions).pipe(map((r) => {
      this.getAllTransactions().subscribe((r) => {
        console.log("All Transactions Refreshed");
      });
      return r;
    }));
  }

  public addCategory(cat: string) {
    return this.http.post("/api/v1/api/category", {cat: cat}, httpOptions);
  }

  public getExistingCategories(): Observable<any> {
    return this.http.get("/api/v1/api/category/getall").pipe(map((r: any) => {
      this.allCategories = r.map((a: any) =>a .cat);
      return this.allCategories;
    }));
  }

}
