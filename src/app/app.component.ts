import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
 
  public isAuth: boolean;

  title = 'app';

  constructor(private _router: Router) {

  }

  public ngOnInit() {
    if (localStorage.getItem('token')) {
      this.isAuth = true;
    } else {
      this.isAuth = false;
    }
  }

  public logOut() {
    localStorage.removeItem('token');
    this.isAuth = false;
    location.reload();
  }
}
