import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers } from '@angular/http';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  
  public isAuth: boolean;
  public isAdmin: string;
  public data: any = [];

  title = 'app';

  constructor(private _http: Http, private _router: Router) {

  }

  public ngOnInit() {

    this.isAdmin = localStorage.getItem('administrator');
    
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
    this._router.navigateByUrl('');

  }
}
