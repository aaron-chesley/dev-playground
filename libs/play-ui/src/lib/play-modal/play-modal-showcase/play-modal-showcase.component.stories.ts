import { moduleMetadata, StoryFn, Meta } from '@storybook/angular';
import { PlayModalShowcaseComponent } from './play-modal-showcase.component';

export default {
  title: 'PlayModalShowcase',
  component: PlayModalShowcaseComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
} as Meta<PlayModalShowcaseComponent>;

const Template: StoryFn<PlayModalShowcaseComponent> = (args: PlayModalShowcaseComponent) => ({
  props: args,
});

export const Showcase = Template.bind({});
Showcase.args = {
  disableBackdropClose: false,
};
