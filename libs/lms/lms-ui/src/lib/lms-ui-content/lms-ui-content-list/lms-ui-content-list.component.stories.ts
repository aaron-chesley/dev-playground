import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { LmsUiContentListComponent } from './lms-ui-content-list.component';

export default {
  title: 'LmsUiContentListComponent',
  component: LmsUiContentListComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
} as Meta<LmsUiContentListComponent>;

const Template: Story<LmsUiContentListComponent> = (
  args: LmsUiContentListComponent
) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {};
