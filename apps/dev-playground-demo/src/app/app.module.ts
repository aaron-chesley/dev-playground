import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import {
  PlayCardModule,
  PlayButtonModule,
  PlayInputTextModule,
  PlayCounterModule,
  PlayModalModule,
} from '@dev-playground/play-ui';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    PlayCardModule,
    PlayButtonModule,
    PlayInputTextModule,
    PlayCounterModule,
    PlayModalModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
