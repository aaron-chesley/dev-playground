import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { PlayToggleModule } from './play-toggle.module';
import { PlayToggleComponent } from './play-toggle.component';

export default {
  title: 'PlayToggleComponent',
  component: PlayToggleComponent,
  decorators: [
    moduleMetadata({
      imports: [PlayToggleModule],
    }),
  ],
} as Meta<PlayToggleComponent>;

const Template: Story<PlayToggleComponent> = (args: PlayToggleComponent) => ({
  props: args,
});

export const Showcase = Template.bind({});
Showcase.args = {};
