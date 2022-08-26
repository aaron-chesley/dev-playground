import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { PlayLmsUiLoginComponent } from './login.component';

export default {
  title: 'PlayLmsUiLoginComponent',
  component: PlayLmsUiLoginComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
} as Meta<PlayLmsUiLoginComponent>;

const Template: Story<PlayLmsUiLoginComponent> = (
  args: PlayLmsUiLoginComponent
) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {};

export const Loading = Template.bind({});
Loading.args = { loading: true };
