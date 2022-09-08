import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { LmsUiVideoItemComponent } from './lms-ui-video-item.component';

export default {
  title: 'LmsUiVideoItemComponent',
  component: LmsUiVideoItemComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
} as Meta<LmsUiVideoItemComponent>;

const Template: Story<LmsUiVideoItemComponent> = (
  args: LmsUiVideoItemComponent
) => ({
  props: args,
  template: `<lms-ui-video-item class="lms-sb-video-item" [video]="video"></lms-ui-video-item>`,
  styles: [`.lms-sb-video-item {width: 300px; margin: 5px}`],
});

export const Primary = Template.bind({});
Primary.args = {
  video: {
    id: '1',
    name: 'Vindicated',
    description: 'Provided to YouTube by Universal Music Group',
    duration: '3:21',
    video_url: 'https://youtu.be/-B2yzG6Gj0A',
    thumbnail_url: 'https://i.ytimg.com/vi/A94dmLthBHA/maxresdefault.jpg',
  },
};
