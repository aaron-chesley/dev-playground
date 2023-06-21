import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { PlayTableComponent } from './play-table.component';

export default {
  title: 'PlayTable',
  component: PlayTableComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
} as Meta<PlayTableComponent>;

const Template: Story<PlayTableComponent> = (args: PlayTableComponent) => ({
  props: args,
});

export const Showcase = Template.bind({});
Showcase.args = {
  columns: [
    {
      key: 'callInfo',
      label: 'Call Info',
      sortable: true,
    },
    {
      key: 'id',
      label: 'ID',
      sortable: true,
    },
    {
      key: 'duration',
      label: 'Duration',
      sortable: true,
    },
    {
      key: 'callingParty',
      label: 'Calling Party',
      sortable: true,
    },
    {
      key: 'receivingParty',
      label: 'Receiving Party',
      sortable: true,
    },
    {
      key: 'dnis',
      label: 'DNIS',
      sortable: true,
    },
    {
      key: 'callerName',
      label: 'Caller Name',
      sortable: true,
    },
    {
      key: 'location',
      label: 'Location',
      sortable: true,
    },
    {
      key: 'group',
      label: 'Group',
      sortable: true,
    },
    {
      key: 'skill',
      label: 'Skill',
      sortable: true,
    },
    {
      key: 'startTimestamp',
      label: 'Start Timestamp',
      sortable: true,
    },
  ],
  rows: [
    {
      callInfo: 'Call 1 - Inbound',
      id: 'cea4a26f-bd8d-47b6-9610-cbc04118f524',
      duration: '0:30:09',
      callingParty: 'John Doe',
      receivingParty: 'Anonymous',
      dnis: '201',
      callerName: 'John Doe',
      location: 'Salt Lake City, UT',
      group: 'Default',
      skill: 'Default',
      startTimestamp: Date.now(),
      rows: [
        {
          callInfo: 'Queue',
          id: '2020',
          duration: '0:00:05',
          callingParty: '8019351581',
          receivingParty: 'Webrtc Agent 1(201)',
          dnis: '',
          callerName: '',
          location: '',
          group: 'Default',
          skill: 'Default',
          startTimestamp: Date.now(),
          rows: [
            {
              callInfo: 'Agent',
              id: '201',
              duration: '0:00:05',
              callingParty: '8019351581',
              receivingParty: 'Webrtc Agent 1(201)',
              dnis: '',
              callerName: '',
              location: '',
              group: 'Default',
              skill: 'Default',
              startTimestamp: Date.now(),
              rows: [],
            },
          ],
        },
      ],
    },
    {
      callInfo: 'Call 2 - Inbound',
      id: 'bdd156a9-8b60-474a-bdd3-8d00c344051c',
      duration: '0:19:01',
      callingParty: '8019351589',
      receivingParty: 'Anonymous',
      dnis: '201',
      callerName: 'Jane Doe',
      location: 'Salt Lake City, UT',
      group: 'No Skill',
      skill: 'No Skill',
      startTimestamp: Date.now(),
      rows: [],
    },
    {
      callInfo: 'Call 3 - Inbound',
      id: '36442523-2819-4d4d-9327-05407664bb1b',
      duration: '0:56:29',
      callingParty: 'John Smith',
      receivingParty: 'Anonymous',
      dnis: '201',
      callerName: 'John Smith',
      location: 'Salt Lake City, UT',
      group: 'Default',
      skill: 'Default',
      startTimestamp: Date.now(),
      rows: [],
    },
  ],
};
