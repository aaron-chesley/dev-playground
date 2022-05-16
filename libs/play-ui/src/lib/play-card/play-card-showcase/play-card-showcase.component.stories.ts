import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { PlayCardShowcaseModule } from './play-card-showcase.module';
import { PlayCardShowcaseComponent } from './play-card-showcase.component';

export default {
  title: 'PlayCardShowcaseComponent',
  component: PlayCardShowcaseComponent,
  decorators: [
    moduleMetadata({
      imports: [PlayCardShowcaseModule],
    }),
  ],
} as Meta<PlayCardShowcaseComponent>;

const Template: Story<PlayCardShowcaseComponent> = (
  args: PlayCardShowcaseComponent
) => ({
  props: args,
});

export const Showcase = Template.bind({});
Showcase.args = {
  showHeader: true,
  showFooter: true,
};
