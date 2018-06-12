import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DevteamComponent } from './devteam/devteam.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { IcosComponent } from './icos/icos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { IntroductionComponent } from './introduction/introduction.component';
import { SomethingComponent } from './something/something.component';
import { PartnersComponent } from './partners/partners.component';
import { AboutComponent } from './about/about.component';
import { FakeIcoGuideComponent } from './fake-ico-guide/fake-ico-guide.component';
import { BuyScamTokenComponent } from './buy-scam-token/buy-scam-token.component';
import { SearchpipePipe } from './pipes/searchpipe.pipe';
import { ShowIcoComponent } from './show-ico/show-ico.component';
import { BalanceComponent } from './balance/balance.component';
import { AddicoComponent } from './addico/addico.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DevteamComponent,
    LoginComponent,
    RegistrationComponent,
    HomeComponent,
    IcosComponent,
    IntroductionComponent,
    SomethingComponent,
    PartnersComponent,
    AboutComponent,
    FakeIcoGuideComponent,
    BuyScamTokenComponent,
    SearchpipePipe,
    ShowIcoComponent,
    BalanceComponent,
    AddicoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
