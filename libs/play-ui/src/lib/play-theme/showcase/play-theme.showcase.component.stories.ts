import { moduleMetadata, StoryFn, Meta } from '@storybook/angular';
import { PlayThemeShowcaseComponent } from './play-theme.showcase.component';

export default {
  title: 'PlayThemeShowcase',
  component: PlayThemeShowcaseComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
} as Meta<PlayThemeShowcaseComponent>;

const Template: StoryFn<PlayThemeShowcaseComponent> = (args) => ({
  props: args,
});

export const Showcase = Template.bind({});
Showcase.args = {};
