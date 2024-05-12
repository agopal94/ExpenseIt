import { Component, ViewChild } from '@angular/core';
import { TransactionService } from '../transaction.service';
import { Transaction } from '../app.models';
import { IonModal } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  @ViewChild(IonModal) modal!: IonModal;

  public newTransactionType: "INCOME" | "EXPENSE" = "INCOME";
  public newCategoryType: string = "";
  public newCategory: string = "";
  public newValue: number = 0;
  public availableCategories: string[] = [];


  constructor(private svc: TransactionService) {
    this.refreshAvailableCategories();
  }

  saveTransaction() {
    console.log("In saveTransaction");
    const newTransaction: Transaction = {
      category: this.newCategory,
      type: this.newTransactionType,
      value: this.newValue,
      guid: "NEW_TRANSACTION"
    };
    console.log(newTransaction);
    this.svc.addTransaction(newTransaction).subscribe((r) => {
      console.log(r);
      this.resetInputs();
      this.modal.dismiss();
    });
  }

  resetInputs() {
    this.newCategory = "";
    this.newValue = 0;
    this.newCategoryType = "";
  }

  saveCategory() {
    console.log(this.newCategoryType);
    this.svc.addCategory(this.newCategoryType).subscribe((r) => {
      this.resetInputs();
      this.refreshAvailableCategories();
    });
  }

  refreshAvailableCategories() {
    this.svc.getExistingCategories().subscribe((r) => {
      this.availableCategories = r;
    });
  }

  onTransactionTypeChange($event: any) {
    this.newTransactionType = $event.detail.value;
  }

  setCategory($event: any) {
    this.newCategoryType = $event.target.value;
  }

  setValue($event: any) {
    this.newValue = $event.target.value;
  }

}
