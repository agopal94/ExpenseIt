import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CategoryService } from '../category.service';
import { AccountsService } from '../accounts.service';
import { AccountDB, CategoryDB, Transaction } from '../models';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import { TransactionService } from '../transaction.service';

@Component({
  selector: 'app-create-transaction',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatFormFieldModule,MatSelectModule, FormsModule,MatInputModule],
  templateUrl: './create-transaction.component.html',
  styleUrl: './create-transaction.component.scss'
})
export class CreateTransactionComponent implements OnInit {

  newCategoryValue="";
  availableAccounts: AccountDB[] = [];
  selectedAccount: number | undefined;
  availableCategories: CategoryDB[] = [];
  selectedCategory = "";
  selectedType = "";
  amount = 0.0;

  constructor(private catSvc: CategoryService, private accSvc: AccountsService, private transSvc: TransactionService) {

  }

  ngOnInit(): void {
    this.availableAccounts = this.accSvc.availableAccounts;
    this.selectedAccount = this.availableAccounts[0].id;
    this.availableCategories = this.catSvc.availableCategories;
    this.selectedCategory  = this.availableCategories[0].cat;
  }

  onSubmit() {
    console.warn(this.selectedAccount);
    console.warn(this.selectedCategory);
    console.warn(this.selectedType);
    console.warn(this.amount);
    const newTransaction: Transaction = {
      acc_id: Number(this.selectedAccount),
      category: this.selectedCategory,
      guid:uuidv4(),
      ts: moment().format(),
      type: this.selectedType,
      value: this.amount
    }
    this.transSvc.addTransaction(newTransaction).subscribe((res) => {
      console.warn(res);
    })
  }

  onSubmitCategory() {
    console.warn(this.newCategoryValue);
    this.catSvc.createNewCategory(this.newCategoryValue).subscribe((res) => {
      console.warn(res);
    })
  }

  onCancel() {

  }
}
