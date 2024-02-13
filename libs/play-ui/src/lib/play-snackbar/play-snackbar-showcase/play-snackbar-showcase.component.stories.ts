import { Story, Meta, applicationConfig } from '@storybook/angular';
import { PlaySnackbarShowcaseComponent } from './play-snackbar-showcase.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { PLAY_SNACKBAR_POSITIONS } from '../play-snackbar-position.type';

export default {
  title: 'PlaySnackbarShowcase',
  component: PlaySnackbarShowcaseComponent,
  argTypes: {
    position: {
      options: PLAY_SNACKBAR_POSITIONS,
      control: { type: 'select' },
    },
  },
  decorators: [
    applicationConfig({
      providers: [provideAnimations()],
    }),
  ],
} as Meta<PlaySnackbarShowcaseComponent>;

const Template: Story<PlaySnackbarShowcaseComponent> = (args: PlaySnackbarShowcaseComponent) => ({
  props: args,
});

export const Showcase = Template.bind({});
Showcase.args = {
  position: 'top-right',
};
