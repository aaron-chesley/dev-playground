import { Component, Input, OnInit } from '@angular/core';
import { Editor } from '@tiptap/core';

interface Font {
  display: string;
  cssValue: string;
}

@Component({
  selector: 'dev-playground-tip-tap-editor-menu',
  templateUrl: 'tip-tap-editor-menu.component.html',
  styleUrls: ['tip-tap-editor-menu.component.scss'],
})
export class TipTapEditorMenuComponent implements OnInit {
  @Input() editor!: Editor;

  private imageUrls: string[] = [];

  fontSizes: Font[] = [
    { display: 'Small', cssValue: '10px' },
    { display: 'Normal', cssValue: '13px' },
    { display: 'Large', cssValue: '18px' },
    { display: 'Huge', cssValue: '32px' },
  ];

  fontFamilies: Font[] = [
    { display: 'Arial', cssValue: 'Arial, sans-serif' },
    { display: 'Verdana', cssValue: 'Verdana, sans-serif' },
    { display: 'Helvetica', cssValue: 'Helvetica, sans-serif' },
    { display: 'Tahoma', cssValue: 'Tahoma, sans-serif' },
    { display: 'Trebuchet MS', cssValue: 'Trebuchet MS, sans-serif' },
    { display: 'Times New Roman', cssValue: 'Times New Roman, serif' },
    { display: 'Georgia', cssValue: 'Georgia, serif' },
    { display: 'Garamond', cssValue: 'Garamond, serif' },
    { display: 'Courier New', cssValue: 'Courier New, monospace' },
    { display: 'Brush Script MT', cssValue: 'Brush Script MT, cursive' },
  ];

  ngOnInit(): void {
    // this.setupDefaultOptions();
    return;
  }

  setupDefaultOptions(): void {
    setTimeout(() => {
      // Set Default Font Family:
      this.editor
        .chain()
        .focus()
        .setFontFamily(this.fontFamilies[0].cssValue)
        .run();
      // Set Default Font Size:
      this.editor.chain().focus().setFontSize(this.fontSizes[1].cssValue).run();
    });
  }

  toggleBold(): void {
    this.editor.chain().focus().toggleBold().run();
  }

  toggleItalic(): void {
    this.editor.chain().focus().toggleItalic().run();
  }

  toggleUnderline(): void {
    this.editor.chain().focus().toggleUnderline().run();
  }

  toggleBulletList(): void {
    this.editor.chain().focus().toggleBulletList().run();
  }

  toggleOrderedList(): void {
    this.editor.chain().focus().toggleOrderedList().run();
  }

  undo(): void {
    this.editor.chain().undo().run();
  }

  canUndo(): boolean {
    return this.editor.can().undo();
  }

  redo(): void {
    this.editor.chain().redo().run();
  }

  canRedo(): boolean {
    return this.editor.can().redo();
  }

  leftAlign(): void {
    this.editor.commands.setTextAlign('left');
  }

  centerAlign(): void {
    this.editor.commands.setTextAlign('center');
  }

  rightAlign(): void {
    this.editor.commands.setTextAlign('right');
  }

  justifyAlign(): void {
    this.editor.commands.setTextAlign('justify');
  }

  setColor(event: any): void {
    const color = event.target.value as string;
    if (!color) {
      this.editor.chain().focus().unsetColor().run();
    }
    this.editor.chain().focus().setColor(color).run();
  }

  getCurrentFontColor(): string {
    return this.editor.getAttributes('textStyle').color;
  }

  setFontSize(event: any): void {
    const size = event.target.value as string;
    if (!size) {
      this.editor.chain().focus().unsetFontSize().run();
    }
    this.editor.chain().focus().setFontSize(size).run();
  }

  getCurrentFontSize(): string {
    return this.editor.getAttributes('textStyle').fontSize;
  }

  setFontFamily(event: any): void {
    const family = event.target.value as string;
    if (!family) {
      this.editor.chain().focus().unsetFontFamily().run();
    }
    this.editor.chain().focus().setFontFamily(family).run();
  }

  getCurrentFontFamily(): string {
    return this.editor.getAttributes('textStyle').fontFamily;
  }

  addImageFromUrl(): void {
    const url = window.prompt('URL');

    if (url) {
      this.editor.chain().focus().setImage({ src: url }).run();
      this.editor.chain().focus().enter().run();
    }
  }

  addImageFromFile(event: any): void {
    if (
      event &&
      event.target &&
      event.target.files &&
      event.target.files.length
    ) {
      const file = event.target.files[0];

      // Remember to clean these up as soon as possible (either in ngOnDestroy or after successful upload) using URL.revokeObjectUrl()
      // https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL#usage_notes
      const url = URL.createObjectURL(file);

      // Storing for cleanup later
      this.imageUrls.push(url);

      this.editor.chain().focus().setImage({ src: url }).run();
      this.editor.chain().focus().enter().run();
    }
  }
}
