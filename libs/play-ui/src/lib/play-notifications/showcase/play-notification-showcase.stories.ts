import { moduleMetadata, Story, Meta } from '@storybook/angular';
import {
  PlayNotificationShowcaseModule,
  PlayNotificationShowcaseComponent,
} from './play-notification-showcase';

export default {
  title: 'PlayNotificationShowcaseComponent',
  component: PlayNotificationShowcaseComponent,
  decorators: [
    moduleMetadata({
      imports: [PlayNotificationShowcaseModule],
    }),
  ],
} as Meta<PlayNotificationShowcaseComponent>;

const Template: Story<PlayNotificationShowcaseComponent> = (
  args: PlayNotificationShowcaseComponent
) => ({
  props: args,
});

export const Showcase = Template.bind({});
Showcase.args = {};
