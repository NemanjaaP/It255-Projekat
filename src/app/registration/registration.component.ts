import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  public registerForm = new FormGroup({
    email: new FormControl(),
    username: new FormControl(),
    password: new FormControl(),
  });
  constructor(private _http: Http, private _router: Router) { }

  ngOnInit() {
  }

  public register() {
    // tslint:disable-next-line:max-line-length
    const data = 'email=' + this.registerForm.value.email + '&username=' + this.registerForm.value.username + '&password=' + this.registerForm.value.password;
    console.log(this.registerForm.value.email);
    console.log(this.registerForm.value.username);

    console.log(this.registerForm.value.password);

    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    this._http.post('http://localhost/it255/it255/registerservice.php', data, { headers: headers }).subscribe((result) => {
      const obj = JSON.parse(result['_body']);
      localStorage.setItem('token', obj.token);
      this._router.navigateByUrl('');
    },
      err => {
        console.log("greska");
      }
    );

  }

}
