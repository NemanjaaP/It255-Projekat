import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  
  public isAuth: boolean;
  public isAdmin: string;

  title = 'app';

  constructor(private _router: Router) {

  }

  public ngOnInit() {

    this.isAdmin = localStorage.getItem('administrator');
    // console.log("ADMINISTRATOR JE:", this.isAdmin);
    
    if (localStorage.getItem('token')) {
      this.isAuth = true;
    } else {
      this.isAuth = false;
    }
  }

  public logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('administrator');
    this.isAuth = false;
    location.reload();
  }

}
