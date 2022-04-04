import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgxTiptapModule } from 'ngx-tiptap';

import { TipTapEditorComponent } from './tip-tap-editor/tip-tap-editor.component';
import { TipTapEditorMenuComponent } from './tip-tap-editor-menu/tip-tap-editor-menu.component';

@NgModule({
  imports: [CommonModule, FormsModule, NgxTiptapModule],
  exports: [TipTapEditorComponent],
  declarations: [TipTapEditorComponent, TipTapEditorMenuComponent],
  providers: [],
})
export class TipTapEditorModule {}
