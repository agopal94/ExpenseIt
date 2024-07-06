import { Component } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular'; // Angular Data Grid Component
import { ColDef } from 'ag-grid-community'; // Column Definition Type Interface
import { MetadataService } from '../metadata.service';
import { MetadataDB } from '../models';
import {MatDividerModule} from '@angular/material/divider';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DeleteBtnComponent } from './deleteBtnComponent.component';

@Component({
  selector: 'metadata',
  standalone: true,
  imports: [AgGridAngular, MatDividerModule, FormsModule, MatInputModule, MatIconModule, MatButtonModule],
  templateUrl: './metadata.component.html',
  styleUrl: './metadata.component.scss'
})
export class MetadataComponent {
  rowData: MetadataDB[] = [
  ];

  gridApi = null;

  gridOptions: any = {
    columnDefs: [
      { field: "type", headerName: "Type" },
      { field: "key", headerName: "Key" },
      { field: "value", headerName: "Value" },
      { field: "delete", headerName: "Delete", cellRenderer: DeleteBtnComponent, width: "90px",
        onCellClicked: ((params: any) => {
          this.metadataSvc.deleteMetadata(params.data.id).subscribe((res) => {
            this.metadataSvc.getAllMetadata().subscribe((res) => {
              this.initView();
            })
          })
        })
       }
    ]
  };

  newType = '';
  newKey = '';
  newValue = '';

  constructor(private metadataSvc: MetadataService) {
    this.initView();
  }

  private initView() {
    this.rowData = this.metadataSvc.availableMetadata;
  }

  public saveMetadata() {
    this.metadataSvc.createNewMetadata(this.newKey, this.newValue, this.newType).subscribe((res) => {
      console.log(res);
      this.metadataSvc.getAllMetadata().subscribe((res) => {
        console.log("Metadata Refreshed.");
        this.initView();
      })
    })
  }

}
