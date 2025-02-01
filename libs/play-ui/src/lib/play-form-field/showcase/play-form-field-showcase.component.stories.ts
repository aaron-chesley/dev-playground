import { moduleMetadata, StoryFn, Meta } from '@storybook/angular';
import { PlayFormFieldShowcaseComponent } from './play-form-field-showcase.component';

export default {
  title: 'PlayFormFieldShowcase',
  component: PlayFormFieldShowcaseComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
} as Meta<PlayFormFieldShowcaseComponent>;

const Template: StoryFn<PlayFormFieldShowcaseComponent> = (args: Partial<PlayFormFieldShowcaseComponent>) => ({
  props: args,
});

export const Showcase = Template.bind({});
Showcase.args = {};
