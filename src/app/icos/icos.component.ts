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
  isAdmin = localStorage.getItem('administrator');

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

//METODA ZA BRISANJE ICO-A OD STRANE ADMINISTRATORA
  public delete(id:string) {
    // tslint:disable-next-line:max-line-length

    const data = 'id=' + id;


    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('token', localStorage.getItem('token'));

    console.log(id);

    this._http.post('http://localhost/it255/it255/deleteicoservice.php', data, { headers: headers }).subscribe((result) => {
      const obj = JSON.parse(result['_body']);
    },
      err => {
        console.log("greska");
      }
    );

    const headers1 = new Headers();
    headers1.append('Content-Type', 'application/x-www-form-urlencoded');
    headers1.append('token', localStorage.getItem('token'));
    this._http.get('http://localhost/it255/it255/allicosservice.php', { headers: headers1 })
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
