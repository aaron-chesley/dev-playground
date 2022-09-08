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
Primary.args = {
  contentItems: [
    {
      id: '1',
      content_type: 'VIDEO',
      slide: null,
      video: {
        id: '1',
        name: 'Seize The Day',
        description:
          'Seize The Day by Avenged Sevenfold from the album City of Evil © 2005',
        duration: '5:38',
        video_url: 'https://youtu.be/-B2yzG6Gj0A',
        thumbnail_url: 'https://i.ytimg.com/vi/-B2yzG6Gj0A/maxresdefault.jpg',
      },
    },
    {
      id: '2',
      content_type: 'VIDEO',
      slide: null,
      video: {
        id: '2',
        name: 'Hail To The King',
        description:
          'Watch the official music video for Hail To The King by Avenged Sevenfold from the album Hail To The King.',
        duration: '05:13',
        video_url: 'https://youtu.be/DelhLppPSxY',
        thumbnail_url:
          'https://upload.wikimedia.org/wikipedia/en/thumb/6/64/HailToTheKingVinyl.jpeg/220px-HailToTheKingVinyl.jpeg',
      },
    },
    {
      id: '3',
      content_type: 'VIDEO',
      slide: null,
      video: {
        id: '3',
        name: 'Helena',
        description:
          'Watch the official music video for Helena by My Chemical Romance from the album Three Cheers for Sweet Revenge.',
        duration: '03:30',
        video_url: 'https://youtu.be/UCCyoocDxBA',
        thumbnail_url: 'https://i.ytimg.com/vi/UCCyoocDxBA/maxresdefault.jpg',
      },
    },
    {
      id: '4',
      content_type: 'VIDEO',
      slide: null,
      video: {
        id: '4',
        name: 'In Too Deep',
        description:
          'Official Music Video for In Too Deep performed by SUM 41.',
        duration: '3:40',
        video_url: 'https://youtu.be/emGri7i8Y2Y',
        thumbnail_url: 'https://i.ytimg.com/vi/emGri7i8Y2Y/maxresdefault.jpg',
      },
    },
    {
      id: '5',
      content_type: 'VIDEO',
      slide: null,
      video: {
        id: '5',
        name: '1985',
        description: "Bowling For Soup's official music video for '1985'.",
        duration: '3:32',
        video_url: 'https://youtu.be/K38xNqZvBJI',
        thumbnail_url: 'https://i.ytimg.com/vi/K38xNqZvBJI/maxresdefault.jpg',
      },
    },
    {
      id: '6',
      content_type: 'VIDEO',
      slide: null,
      video: {
        id: '6',
        name: 'The Taste Of Ink',
        description: 'The Taste Of Ink Music Video by The Used.',
        duration: '3:19',
        video_url: 'https://youtu.be/aJXRFcyWgdk',
        thumbnail_url: 'https://i.ytimg.com/vi/GOobbLwrLCc/hqdefault.jpg',
      },
    },
    {
      id: '7',
      content_type: 'VIDEO',
      slide: null,
      video: {
        id: '7',
        name: 'A Decade Under the Influence',
        description:
          "Music video by Taking Back Sunday performing A Decade Under the Influence. (C) 2004 i feel like i'm taking crazy pills, Inc.",
        duration: '4:09',
        video_url: 'https://youtu.be/S9z3gv3MWaM',
        thumbnail_url: 'https://i.ytimg.com/vi/_GVCSkFU_n8/maxresdefault.jpg',
      },
    },
    {
      id: '8',
      content_type: 'VIDEO',
      slide: null,
      video: {
        id: '8',
        name: 'Vindicated',
        description: 'Provided to YouTube by Universal Music Group',
        duration: '3:21',
        video_url: 'https://youtu.be/-B2yzG6Gj0A',
        thumbnail_url: 'https://i.ytimg.com/vi/A94dmLthBHA/maxresdefault.jpg',
      },
    },
  ],
};
