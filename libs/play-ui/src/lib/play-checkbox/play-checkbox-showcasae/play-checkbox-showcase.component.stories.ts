import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { PlayCheckboxShowcaseComponent } from './play-checkbox-showcase.component';
import { PlayCheckboxShowcaseModule } from './play-checkbox-showcase.module';

export default {
  title: 'PlayCheckboxShowcaseComponent',
  component: PlayCheckboxShowcaseComponent,
  decorators: [
    moduleMetadata({
      imports: [PlayCheckboxShowcaseModule],
    }),
  ],
} as Meta<PlayCheckboxShowcaseComponent>;

const Template: Story<PlayCheckboxShowcaseComponent> = (
  args: PlayCheckboxShowcaseComponent
) => ({
  props: args,
});

export const Showcase = Template.bind({});
Showcase.args = {};
