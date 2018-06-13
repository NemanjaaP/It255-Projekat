import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers } from '@angular/http';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  
  public isAuth: boolean;
  public isAdmin: string;
  public data: any = [];

  title = 'app';

  constructor(private _http: Http, private _router: Router) {

  }

  public ngOnInit() {

    this.isAdmin = localStorage.getItem('administrator');


    const token = 'token=' + localStorage.getItem('token');
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('token', localStorage.getItem('token'));
    this._http.post('http://localhost/it255/it255/getscambalance.php', token , { headers: headers })
      .subscribe(data => {
        this.data = JSON.parse(data['_body']).balances;
        console.log(this.data);
        console.log(token);
      },
        err => {
          this._router.navigate(['']);
        }
      );


    
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
