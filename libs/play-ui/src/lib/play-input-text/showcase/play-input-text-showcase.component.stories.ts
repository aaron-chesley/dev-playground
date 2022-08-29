import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { PlayInputTextShowcaseComponent } from './play-input-text-showcase.component';

export default {
  title: 'PlayInputTextShowcase',
  component: PlayInputTextShowcaseComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
} as Meta<PlayInputTextShowcaseComponent>;

const Template: Story<PlayInputTextShowcaseComponent> = (
  args: PlayInputTextShowcaseComponent
) => ({
  props: args,
});

export const Showcase = Template.bind({});
Showcase.args = {};
