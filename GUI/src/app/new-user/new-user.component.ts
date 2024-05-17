import { Component } from '@angular/core';
import {MatButtonModule, MatIconButton} from '@angular/material/button';

@Component({
  selector: 'app-new-user',
  standalone: true,
  imports: [MatButtonModule, MatIconButton],
  templateUrl: './new-user.component.html',
  styleUrl: './new-user.component.scss'
})
export class NewUserComponent {

}
