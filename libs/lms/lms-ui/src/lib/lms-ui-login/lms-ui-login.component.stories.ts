import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { LmsUiLoginComponent } from './lms-ui-login.component';

export default {
  title: 'LmsUiLoginComponent',
  component: LmsUiLoginComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
} as Meta<LmsUiLoginComponent>;

const Template: Story<LmsUiLoginComponent> = (args: LmsUiLoginComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {};

export const Loading = Template.bind({});
Loading.args = { loading: true };
