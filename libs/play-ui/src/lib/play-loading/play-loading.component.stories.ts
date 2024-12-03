import { moduleMetadata, StoryFn, Meta } from '@storybook/angular';
import { PlayLoadingShowcaseComponent } from './play-loading-showcase.component';

export default {
  title: 'PlayLoadingShowcase',
  component: PlayLoadingShowcaseComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
} as Meta<PlayLoadingShowcaseComponent>;

const Template: StoryFn<PlayLoadingShowcaseComponent> = (args: PlayLoadingShowcaseComponent) => ({
  props: args,
});

export const Showcase = Template.bind({});
Showcase.args = {};
