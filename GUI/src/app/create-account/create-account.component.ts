import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {FormsModule} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { AccountsService } from '../accounts.service';
import { Account } from '../models';
@Component({
  selector: 'app-create-account',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatFormFieldModule,MatSelectModule, FormsModule,MatInputModule],
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.scss'
})
export class CreateAccountComponent {

  openingBalance=0.0;
  selectedType="";

  constructor(private accService: AccountsService) {

  }

  onSubmit() {
    console.warn(this.openingBalance);
    console.warn(this.selectedType);
    const newAcc: Account = {
      accType: this.selectedType,
      openingBalance: this.openingBalance
    }
    this.accService.createNewAccount(newAcc).subscribe((res) => {
      console.warn(res);
    })
  }

  onCancel() {

  }

}
