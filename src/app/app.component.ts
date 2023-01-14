import { Component, OnInit } from '@angular/core';
import { AuthService } from './@app/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {
  title = 'Bluworks-task';

  constructor(private authService: AuthService) {
    this.authService.loadCurrentUser();

   }

}
