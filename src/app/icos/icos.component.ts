import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-icos',
  templateUrl: './icos.component.html',
  styleUrls: ['./icos.component.scss']
})
export class IcosComponent implements OnInit {
  public data: any = [];
  public data2: any = [];


  constructor(private _http: Http, private _router: Router) {
  }

  ngOnInit() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('token', localStorage.getItem('token'));
    this._http.get('http://localhost/it255/it255/allicosservice.php', { headers: headers })
      .subscribe(data => {
        this.data = JSON.parse(data['_body']).icos;
        console.log(this.data);
      },
        err => {
          this._router.navigate(['']);
        }
      );
  }

}
