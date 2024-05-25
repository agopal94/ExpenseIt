import { Component } from '@angular/core';
import { AccountsService } from '../accounts.service';
import {MatToolbarModule} from '@angular/material/toolbar';
import { ControlBarComponent } from '../control-bar/control-bar.component';
import {MatTabsModule} from '@angular/material/tabs';
import { CategoryService } from '../category.service';
import { TransactionService } from '../transaction.service';
import { AllTransactionsComponent } from '../all-transactions/all-transactions.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatToolbarModule, MatTabsModule, ControlBarComponent, AllTransactionsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {


  constructor(private accountSvc: AccountsService, private catSvc: CategoryService, private transSvc: TransactionService) {
    this.initView();
  }

  private initView() {
    this.accountSvc.getAllAccounts().subscribe((res) => {
      console.warn(res);
    });

    this.catSvc.getAllCategories().subscribe((res) => {
      console.warn(res);
    });

    this.transSvc.getAllTransactions().subscribe((res) => {
      console.warn(res);
    })
  }



}
