
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
    standalone: true,
    imports: [MatIconModule, MatButtonModule],
    template: `<button mat-fab aria-label="Save" style="height: 35px;width: 35px;" (click)="buttonClicked()">
                    <mat-icon>delete</mat-icon>
                  </button>`,
})
export class DeleteBtnComponent implements ICellRendererAngularComp {
    agInit(params: any): void {}
    refresh(params: any) {
        return true;
    }
    buttonClicked() {
    }
}