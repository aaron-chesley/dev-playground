import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { LmsUiContentDetailComponent } from './lms-ui-content-detail.component';

export default {
  title: 'LmsUiContentDetailComponent',
  component: LmsUiContentDetailComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
} as Meta<LmsUiContentDetailComponent>;

const Template: Story<LmsUiContentDetailComponent> = (args: LmsUiContentDetailComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {
  content: {
    id: '1',
    content_type: 'VIDEO',
    slide: null,
    video: {
      id: '1',
      name: 'Seize The Day',
      description: 'Seize The Day by Avenged Sevenfold from the album City of Evil © 2005',
      duration: '5:38',
      video_url: 'https://youtu.be/-B2yzG6Gj0A',
      thumbnail_url: 'https://i.ytimg.com/vi/-B2yzG6Gj0A/maxresdefault.jpg',
    },
    assessment: {
      questions: [
        {
          question: 'What is the name of the song?',
          answers: [
            {
              answer: 'Seize The Day',
              is_correct: true,
            },
            {
              answer: 'Seize The Night',
              is_correct: false,
            },
            {
              answer: 'Seize The Afternoon',
              is_correct: false,
            },
            {
              answer: 'Seize The Evening',
              is_correct: false,
            },
          ],
        },
      ],
    },
    tags: [],
  },
};
