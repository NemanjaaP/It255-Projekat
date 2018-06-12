import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Http, Headers } from '@angular/http';
import { FormGroup, FormControl } from '@angular/forms';



@Component({
  selector: 'app-show-ico',
  templateUrl: './show-ico.component.html',
  styleUrls: ['./show-ico.component.scss']
})
export class ShowIcoComponent implements OnInit, OnDestroy {

  private routeSub: any;

  //podaci koji se kupe za parametre
  name: string;
  description: string;
  imgpath: string;
  value: string;
  website: string;
  ico_id: string;
  isAdmin = localStorage.getItem('administrator');

  //podaci html forma 
  public updateForm = new FormGroup({
    name: new FormControl(),
    description: new FormControl(),
    short_description: new FormControl(),
    website: new FormControl(),
    value: new FormControl(),
    imgpath: new FormControl()
  });

  public data: any = [];
  public data2: any = [];
  input: any;

  constructor(private route: ActivatedRoute,
    private router: Router, private _http: Http) { }

  //prikaz podataka ako je obican korisnik u pitanju ----------------------------- KORISNIK
  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      this.ico_id = params['ico_id'];
      this.name = params['name'];
      this.description = params['description'];
      this.value = params['value'];
      // this.imgpath=params['imgpath'];
    })
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  public buy(v: number) {

    const token = localStorage.getItem('token');

    const data2 = 'token=' + token + '&add=' + v + '&ico_id=' + this.ico_id + '&value=' + this.value;

    console.log(token, v, this.ico_id,this.value);
    
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('token', localStorage.getItem('token'));
   
    this._http.post('http://localhost/it255/it255/buyicoservice.php', data2, { headers: headers })
      .subscribe(data2 => {
        this.data2 = JSON.parse(data2['_body']);  
        console.log(this.data2);
        console.log(token);
      },
        err => {
          this.router.navigate(['']);
        }
      );
  }























  //funkcija za update ------------------ ADMINISTRATOR
  public update() {

    this.routeSub = this.route.params.subscribe(params => {
      this.ico_id = params['ico_id'];
    })


    const data = 'name=' + this.updateForm.value.name + '&description=' + this.updateForm.value.description + '&short_description=' + this.updateForm.value.short_description + '&website=' + this.updateForm.value.website + '&value=' + this.updateForm.value.value + '&imgpath=' + this.updateForm.value.imgpath + '&ico_id=' + this.ico_id;
    console.log(this.updateForm.value.name);

    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    this._http.post('http://localhost/it255/it255/updateicoservice.php', data, { headers: headers }).subscribe((result) => {
      const obj = JSON.parse(result['_body']);
    },
      err => {
        console.log("greska");
      }
    );
  }


}
