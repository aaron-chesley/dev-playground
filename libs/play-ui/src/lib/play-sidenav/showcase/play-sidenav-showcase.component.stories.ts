import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PlaySidenavShowcaseComponent } from './play-sidenav-showcase.component';

export default {
  title: 'PlaySidenavShowcase',
  component: PlaySidenavShowcaseComponent,
  decorators: [
    moduleMetadata({
      imports: [BrowserAnimationsModule],
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
