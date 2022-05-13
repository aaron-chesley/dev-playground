import { CommonModule } from '@angular/common';
import { APP_INITIALIZER } from '@angular/core';
import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { PlayIconRegistryService } from '../play-icon-registry.service';
import {
  playIconFontColor,
  playIconFontSize,
  playIconFormattingOptions,
} from '../play-icons';
import { PlayIconComponent } from './play-icon.component';

export default {
  title: 'PlayIconComponent',
  component: PlayIconComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule],
      declarations: [PlayIconComponent],
    }),
  ],
} as Meta<PlayIconComponent>;

const initIconsFactory = (iconService: PlayIconRegistryService) => {
  return () =>
    iconService.registerIcons([
      playIconFontColor,
      playIconFontSize,
      playIconFormattingOptions,
    ]);
};

const Template: Story<PlayIconComponent> = (args: PlayIconComponent) => ({
  moduleMetadata: {
    providers: [
      {
        provide: APP_INITIALIZER,
        useFactory: initIconsFactory,
        multi: true,
        deps: [PlayIconRegistryService],
      },
    ],
  },
  component: PlayIconComponent,
  template: `<div class="container">
    <div class="icon-container">
      <play-icon name="fontColor" color="#4911ee" size="75"></play-icon>
      <small>Font Color</small>
    </div>
    <div class="icon-container">
      <play-icon name="fontSize" color="#4911ee" size="75"></play-icon>
      <small>Font Size</small>
    </div>
    <div class="icon-container">
      <play-icon name="formattingOptions" color="#4911ee" size="75"></play-icon>
      <small>Formatting Options</small>
    </div>
  </div>`,
  styles: [
    `
    .container {
      display: flex;
      flex-direction: row;
    }
    .icon-container {
      display: flex;
      flex-direction: column;
    }
    .icon-container:not(:last-child) {
      margin-right: 25px;
    }
    `,
  ],
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {
  // name: 'birthday',
};
