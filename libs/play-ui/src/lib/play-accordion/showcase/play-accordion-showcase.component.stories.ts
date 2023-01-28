import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { PlayAccordionShowcaseComponent } from './play-accordion-showcase.component';

export default {
  title: 'PlayAccordionShowcase',
  component: PlayAccordionShowcaseComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
} as Meta<PlayAccordionShowcaseComponent>;

const Template: Story<PlayAccordionShowcaseComponent> = (
  args: PlayAccordionShowcaseComponent
) => ({
  props: args,
});

export const Showcase = Template.bind({});
Showcase.args = {};
