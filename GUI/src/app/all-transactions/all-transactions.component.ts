import { Component } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular'; // Angular Data Grid Component
import { ColDef } from 'ag-grid-community'; // Column Definition Type Interface


@Component({
  selector: 'app-all-transactions',
  standalone: true,
  imports: [AgGridAngular],
  templateUrl: './all-transactions.component.html',
  styleUrl: './all-transactions.component.scss'
})
export class AllTransactionsComponent {
 // Row Data: The data to be displayed.
 rowData = [
  { make: "Tesla", model: "Model Y", price: 64950, electric: true },
  { make: "Ford", model: "F-Series", price: 33850, electric: false },
  { make: "Toyota", model: "Corolla", price: 29600, electric: false },
];

// Column Definitions: Defines the columns to be displayed.
colDefs: ColDef[] = [
  { field: "make" },
  { field: "model" },
  { field: "price" },
  { field: "electric" }
];
}
