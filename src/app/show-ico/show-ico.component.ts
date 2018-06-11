import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Http, Headers } from '@angular/http';


@Component({
  selector: 'app-show-ico',
  templateUrl: './show-ico.component.html',
  styleUrls: ['./show-ico.component.scss']
})
export class ShowIcoComponent implements OnInit, OnDestroy {

  private routeSub: any;


  name:string;
  description:string;
  imgpath:string;
  value:string;
  website:string;
  ico_id:string;


  public data: any = [];


  constructor(private route: ActivatedRoute,
    private router: Router,private _http: Http) { }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      this.ico_id = params['ico_id'];
      this.name = params['name'];
      this.description = params['description'];
      this.value = params['value'];


    })

  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }
}
