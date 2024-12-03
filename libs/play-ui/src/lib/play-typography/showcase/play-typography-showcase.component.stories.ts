import { moduleMetadata, StoryFn, Meta } from '@storybook/angular';
import { PlayTypographyShowcaseComponent } from './play-typography-showcase.component';
import { PlayTypographyShowcaseModule } from './play-typography-showcase.module';

export default {
  title: 'PlayTypographyShowcase',
  component: PlayTypographyShowcaseComponent,
  decorators: [
    moduleMetadata({
      imports: [PlayTypographyShowcaseModule],
    }),
  ],
} as Meta<PlayTypographyShowcaseComponent>;

const Template: StoryFn<PlayTypographyShowcaseComponent> = (args: PlayTypographyShowcaseComponent) => ({
  props: args,
});

export const Showcase = Template.bind({});
Showcase.args = {};
