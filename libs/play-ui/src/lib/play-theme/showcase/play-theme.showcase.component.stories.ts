import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { PlayThemeShowcaseComponent } from './play-theme.showcase.component';

export default {
  title: 'PlayThemeShowcaseComponent',
  component: PlayThemeShowcaseComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
} as Meta<PlayThemeShowcaseComponent>;

const Template: Story<PlayThemeShowcaseComponent> = (
  args: PlayThemeShowcaseComponent
) => ({
  props: args,
});

export const Showcase = Template.bind({});
Showcase.args = {};
