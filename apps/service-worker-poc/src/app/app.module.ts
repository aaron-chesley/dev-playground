import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { AppRoutingModule } from './app-routes';
import { SlideoutComponent } from './slideout.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, SlideoutComponent],
  imports: [BrowserModule, MatSidenavModule, AppRoutingModule],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
