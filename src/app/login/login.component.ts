import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm = new FormGroup({
    username: new FormControl(),
    password: new FormControl()
  });
  constructor(private _http: Http, private _router: Router) { }

  ngOnInit() {
    if (localStorage.getItem('token') != null) {
      this._router.navigateByUrl('');
    }
  }

  public login() {
    // tslint:disable-next-line:max-line-length
    const data = 'username=' + this.loginForm.value.username + '&password=' + this.loginForm.value.password;

    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    this._http.post('http://localhost/it255/it255/loginservice.php', data, { headers: headers}).subscribe((result) => {
         const obj = JSON.parse(result['_body']);
         localStorage.setItem('token', obj.token);
         localStorage.setItem('administrator', obj.administrator);
         console.log(obj);
        //location.reload();
       },
        err => {
          alert(JSON.parse(err._body).error);
        }
      );
  }

 
}
