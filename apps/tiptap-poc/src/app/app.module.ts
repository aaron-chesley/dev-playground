import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TipTapEditorModule } from './tiptap-editor/tip-tap-editor.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, TipTapEditorModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
