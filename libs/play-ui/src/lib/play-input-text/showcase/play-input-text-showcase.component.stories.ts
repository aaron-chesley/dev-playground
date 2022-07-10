import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { PlayInputTextShowcaseComponent } from './play-input-text-showcase.component';
import { PlayInputTextShowcaseModule } from './play-input-text-showcase.module';

export default {
  title: 'PlayInputTextShowcaseComponent',
  component: PlayInputTextShowcaseComponent,
  decorators: [
    moduleMetadata({
      imports: [PlayInputTextShowcaseModule],
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
