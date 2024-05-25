import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { CreateAccountComponent } from '../create-account/create-account.component';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { CreateTransactionComponent } from '../create-transaction/create-transaction.component';

@Component({
  selector: 'app-control-bar',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, CreateAccountComponent, CreateTransactionComponent],
  templateUrl: './control-bar.component.html',
  styleUrl: './control-bar.component.scss'
})
export class ControlBarComponent {

  constructor(public dialog: MatDialog) {

  }

  openAccCreationDialog() {
    this.dialog.open(CreateAccountComponent);
  }
  
  openTransactionCreationDialog() {
    this.dialog.open(CreateTransactionComponent);
  }

}
