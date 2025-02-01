import { moduleMetadata, StoryFn, Meta } from '@storybook/angular';
import { PlayCardShowcaseComponent } from './play-card-showcase.component';

export default {
  title: 'PlayCardShowcase',
  component: PlayCardShowcaseComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
} as Meta<PlayCardShowcaseComponent>;

const Template: StoryFn<PlayCardShowcaseComponent> = (args: Partial<PlayCardShowcaseComponent>) => ({
  props: args,
});

export const Showcase = Template.bind({});
Showcase.args = {
  showHeader: true,
  showFooter: true,
  cardHeight: 374,
};
