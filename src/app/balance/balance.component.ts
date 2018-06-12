import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss']
})
export class BalanceComponent implements OnInit {
  public data: any = [];
  public data2: any = [];
  // public token = localStorage.getItem('token');
  constructor(private _http: Http, private _router: Router) {
  }

  ngOnInit() {
    const token = 'token=' + localStorage.getItem('token');
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('token', localStorage.getItem('token'));
    this._http.post('http://localhost/it255/it255/getuserbalanceservice.php', token , { headers: headers })
      .subscribe(data => {
        this.data = JSON.parse(data['_body']).icos;
        console.log(this.data);
        console.log(token);
      },
        err => {
          this._router.navigate(['']);
        }
      );
  }


}
