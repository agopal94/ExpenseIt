import {ChangeDetectionStrategy, Component} from '@angular/core';
import { AccountsService } from '../accounts.service';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTabsModule} from '@angular/material/tabs';
import { MetadataService } from '../metadata.service';
import { TransactionService } from '../transaction.service';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MetadataComponent } from '../metadata/metadata.component';
import { forkJoin } from 'rxjs';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatToolbarModule, MatButtonToggleModule, FormsModule, CommonModule, MetadataComponent, SpinnerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  public selectedView: string = 'ACCOUNTS';
  public initViewSuccess = false;

  constructor(private accountSvc: AccountsService, private metaSvc: MetadataService, private transSvc: TransactionService) {
    this.initView();
  }

  private initView() {
    const initialCalls = [
      this.accountSvc.getAllAccounts(),
      this.metaSvc.getAllMetadata()
    ];
    forkJoin(initialCalls).subscribe((res) => {
      if (res.length === initialCalls.length) {
        console.log("Init Calls Successful. View Loading");
        this.initViewSuccess = true;
      } else {
        console.log("Init Calls Failed.");
      }
    })
  }
}
