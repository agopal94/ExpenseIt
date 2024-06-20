import { Component } from '@angular/core';
import { AccountsService } from '../accounts.service';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTabsModule} from '@angular/material/tabs';
import { MetadataService } from '../metadata.service';
import { TransactionService } from '../transaction.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatToolbarModule, MatTabsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(private accountSvc: AccountsService, private catSvc: MetadataService, private transSvc: TransactionService) {
    this.initView();
  }

  private initView() {
    this.accountSvc.getAllAccounts().subscribe((res) => {
      console.warn(res);
    });

    this.catSvc.getAllMetadata().subscribe((res) => {
      console.warn(res);
    });
  }
}
