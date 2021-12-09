import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import {
  PlayCardModule,
  PlayButtonModule,
  PlayInputTextModule,
  PlayCounterModule,
} from '@dev-playground/playground-ui';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    PlayCardModule,
    PlayButtonModule,
    PlayInputTextModule,
    PlayCounterModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
