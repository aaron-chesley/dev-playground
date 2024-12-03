import { moduleMetadata, StoryFn, Meta } from '@storybook/angular';
import { PlayPaginatorComponent } from './play-paginator.component';

export default {
  title: 'PlayPaginatorShowcase',
  component: PlayPaginatorComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
} as Meta<PlayPaginatorComponent>;

const Template: StoryFn<PlayPaginatorComponent> = (args: PlayPaginatorComponent) => ({
  props: args,
});

export const Showcase = Template.bind({});
Showcase.args = {};
