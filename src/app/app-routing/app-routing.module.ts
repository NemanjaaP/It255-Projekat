import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { LoginComponent } from '../login/login.component';
import { RegistrationComponent } from '../registration/registration.component';
import { FakeIcoGuideComponent } from '../fake-ico-guide/fake-ico-guide.component';
import { IcosComponent } from '../icos/icos.component';
import { ShowIcoComponent } from '../show-ico/show-ico.component';
import { BalanceComponent } from '../balance/balance.component';
import { AddicoComponent } from '../addico/addico.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  }, 
  {
    path:'registration',
    component: RegistrationComponent
  },
  {
    path:'icos',
    component: IcosComponent
  },
  {
    path:'fake-ico-guide',
    component: FakeIcoGuideComponent
  },
  {
    path:'show-ico/:ico_id/:name/:description/:value',
    component: ShowIcoComponent
  },
  {
    path:'balance',
    component: BalanceComponent
  }, 
  {
    path:'addico',
    component: AddicoComponent
  },
  {
    path:'show-ico',
    component: ShowIcoComponent
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }