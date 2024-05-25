import { Component } from '@angular/core';
import {MatButtonModule, MatIconButton} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BootstrapService } from '../bootstrap.service';

@Component({
  selector: 'app-new-user',
  standalone: true,
  imports: [MatButtonModule, MatIconButton, MatIconModule],
  templateUrl: './new-user.component.html',
  styleUrl: './new-user.component.scss'
})
export class NewUserComponent {

  constructor(private bootStrapSvc: BootstrapService) {

  }

  public createNewDatabase() {
    this.bootStrapSvc.createNewDatabase().subscribe((res) => {
      console.log("New Database Initialized. Welcome!");
    })
  }

}
