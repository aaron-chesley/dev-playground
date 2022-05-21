import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { PlayModalShowcaseModule } from './play-modal-showcase.module';
import { PlayModalShowcaseComponent } from './play-modal-showcase.component';

export default {
  title: 'PlayModalShowcaseComponent',
  component: PlayModalShowcaseComponent,
  decorators: [
    moduleMetadata({
      imports: [PlayModalShowcaseModule],
    }),
  ],
} as Meta<PlayModalShowcaseComponent>;

const Template: Story<PlayModalShowcaseComponent> = (
  args: PlayModalShowcaseComponent
) => ({
  props: args,
});

export const Showcase = Template.bind({});
Showcase.args = {};
