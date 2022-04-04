import {
  Component,
  EventEmitter,
  Output,
  ViewEncapsulation,
} from '@angular/core';

import { Editor } from '@tiptap/core';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import Heading from '@tiptap/extension-heading';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import Underline from '@tiptap/extension-underline';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import ListItem from '@tiptap/extension-list-item';
import History from '@tiptap/extension-history';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import FontFamily from '@tiptap/extension-font-family';
import Image from '@tiptap/extension-image';
import DropCursor from '@tiptap/extension-dropcursor';

import { FontSize } from '../custom-extensions/tip-tap-font-size';

@Component({
  selector: 'dev-playground-tip-tap-editor',
  templateUrl: 'tip-tap-editor.component.html',
  styleUrls: ['tip-tap-editor.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TipTapEditorComponent {
  @Output() update = new EventEmitter();

  editor: Editor;
  // value = '<p>Hello there this is a POC of TipTap in action!</p>';
  value = '';

  constructor() {
    this.editor = new Editor({
      extensions: [
        Document,
        Paragraph,
        Text,
        Heading,
        Bold,
        Italic,
        Underline,
        BulletList,
        OrderedList,
        ListItem,
        History,
        TextAlign.configure({
          types: ['heading', 'paragraph'],
        }),
        TextStyle,
        Color,
        FontSize,
        FontFamily,
        Image,
        DropCursor,
      ],
      onUpdate: ({ editor }) => {
        this.update.emit(editor.getJSON());
      },
    });
  }
}
