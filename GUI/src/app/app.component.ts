import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SpinnerComponent } from './spinner/spinner.component';
import { BootstrapService } from './bootstrap.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'expense-it';
  showLoader = false;

  constructor(private bootStrapSvc: BootstrapService,
              private _router: Router
  ) {

  }

  ngOnInit(): void {
    this.showLoader = true;
    this.bootStrapSvc.bootStrapApp().subscribe((res) => {
      if (res) {
        console.log("App Init Successful. Existing Data loaded.");
        this.showLoader = false;
      } else if (res === false) {
        console.log("App Init Successful. No Existing Data found.");
        this.showLoader = false;
        this._router.navigateByUrl('new-user')
      }
    });
  }

}
