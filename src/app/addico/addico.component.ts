import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addico',
  templateUrl: './addico.component.html',
  styleUrls: ['./addico.component.scss']
})
export class AddicoComponent implements OnInit {

  public addIcoForm = new FormGroup({
    name: new FormControl(),
    description: new FormControl(),
    short_description: new FormControl(),
    website: new FormControl(),
    value: new FormControl(),
    imgpath: new FormControl()
  });
  constructor(private _http: Http, private _router: Router) { }

  ngOnInit() {
  }

  public addIco() {
    const data = 'name=' + this.addIcoForm.value.name + '&description=' + this.addIcoForm.value.description + '&short_description=' + this.addIcoForm.value.short_description + '&website=' + this.addIcoForm.value.website + '&value=' + this.addIcoForm.value.value  + '&imgpath=' + this.addIcoForm.value.imgpath;
    console.log(this.addIcoForm.value.name);

    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    this._http.post('http://localhost/it255/it255/addicoservice.php', data, { headers: headers }).subscribe((result) => {
      const obj = JSON.parse(result['_body']);
    },
      err => {
        console.log("greska");
      }
    );
  }
}
