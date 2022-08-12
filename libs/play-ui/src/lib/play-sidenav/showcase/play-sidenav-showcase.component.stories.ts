import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { PlaySidenavShowcaseModule } from './play-sidenav-showcase.module';
import { PlaySidenavShowcaseComponent } from './play-sidenav-showcase.component';

export default {
  title: 'PlaySidenavShowcaseComponent',
  component: PlaySidenavShowcaseComponent,
  decorators: [
    moduleMetadata({
      imports: [PlaySidenavShowcaseModule],
    }),
  ],
} as Meta<PlaySidenavShowcaseComponent>;

const Template: Story<PlaySidenavShowcaseComponent> = (
  args: PlaySidenavShowcaseComponent
) => ({
  props: args,
});

export const Showcase = Template.bind({});
Showcase.args = {};
