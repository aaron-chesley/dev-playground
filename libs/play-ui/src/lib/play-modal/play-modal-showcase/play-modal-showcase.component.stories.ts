import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { PlayModalShowcaseComponent } from './play-modal-showcase.component';

export default {
  title: 'PlayModalShowcaseComponent',
  component: PlayModalShowcaseComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
} as Meta<PlayModalShowcaseComponent>;

const Template: Story<PlayModalShowcaseComponent> = (
  args: PlayModalShowcaseComponent
) => ({
  props: args,
});

export const Showcase = Template.bind({});
Showcase.args = {
  disableBackdropClose: false,
};
