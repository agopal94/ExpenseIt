import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { TransactionService } from '../transaction.service';

@Component({
  selector: 'app-details',
  templateUrl: 'details.page.html',
  styleUrls: ['details.page.scss']
})
export class DetailsPage implements OnInit {
 // Row Data: The data to be displayed.
 rowData = [];

// Column Definitions: Defines the columns to be displayed.
colDefs: ColDef[] = [
  { field: "type", headerName: "Type" },
  { field: "category", headerName: "Category" },
  { field: "value", headerName: "Value" },
  {field: "ts", headerName: "Date"}
];
  constructor(private svc: TransactionService) {}

  ngOnInit(): void {
    this.svc.getAllTransactions().subscribe((r) => {
      this.rowData = r;
    })
  }

}
