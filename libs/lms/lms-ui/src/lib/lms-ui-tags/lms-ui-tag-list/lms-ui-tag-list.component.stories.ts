import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { LmsUiTagListComponent } from './lms-ui-tag-list.component';

export default {
  title: 'LmsUiTagListComponent',
  component: LmsUiTagListComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
} as Meta<LmsUiTagListComponent>;

const Template: Story<LmsUiTagListComponent> = (
  args: LmsUiTagListComponent
) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {
  tags: [
    {
      id: '1',
      name: 'My Cool Tag 1',
    },
    {
      id: '2',
      name: 'My Cool Tag 2',
    },
    {
      id: '3',
      name: 'My Cool Tag 3',
    },
    {
      id: '4',
      name: 'My Cool Tag 4',
    },
    {
      id: '5',
      name: 'My Cool Tag 5',
    },
    {
      id: '6',
      name: 'My Cool Tag 6',
    },
    {
      id: '7',
      name: 'My Cool Tag 7',
    },
    {
      id: '8',
      name: 'My Cool Tag 8',
    },
    {
      id: '9',
      name: 'My Cool Tag 9',
    },
    {
      id: '10',
      name: 'My Cool Tag 10',
    },
  ],
};
