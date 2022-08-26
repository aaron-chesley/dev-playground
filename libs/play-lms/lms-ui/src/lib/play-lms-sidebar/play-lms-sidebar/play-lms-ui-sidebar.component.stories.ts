import { APP_INITIALIZER } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import {
  assignment,
  business,
  dashboard,
  equalizer,
  groupWork,
  history,
  logout,
  loyalty,
  PlayIconModule,
  PlayIconRegistryService,
  settings,
  supervisedUserCircle,
  videoLibrary,
} from '@playground/play-ui';
import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { PlayLmsUiSidebarComponent } from './play-lms-ui-sidebar.component';
import { PlayLmsUiSidebarItemComponent } from '../play-lms-sidebar-item/play-lms-sidebar-item.component';

export default {
  title: 'PlayLmsUiSidebarComponent',
  component: PlayLmsUiSidebarComponent,
  decorators: [
    moduleMetadata({
      imports: [
        BrowserAnimationsModule,
        RouterTestingModule.withRoutes([
          {
            path: 'app/employees',
            children: [],
          },
          {
            path: 'app/reports',
            children: [],
          },
          {
            path: 'app/settings',
            children: [],
          },
          {
            path: 'app/tags',
            children: [],
          },
          {
            path: 'app/teams',
            children: [],
          },
          {
            path: 'app/trainings',
            children: [],
          },
          {
            path: 'app/videos',
            children: [],
          },
        ]),
        PlayLmsUiSidebarItemComponent,
        PlayIconModule,
      ],
      providers: [
        {
          provide: APP_INITIALIZER,
          useFactory: (iconService: PlayIconRegistryService) => {
            return () =>
              iconService.registerIcons([
                dashboard,
                history,
                supervisedUserCircle,
                equalizer,
                settings,
                loyalty,
                groupWork,
                assignment,
                videoLibrary,
                business,
                logout,
              ]);
          },
          multi: true,
          deps: [PlayIconRegistryService],
        },
      ],
    }),
  ],
} as Meta<PlayLmsUiSidebarComponent>;

const Template: Story<PlayLmsUiSidebarComponent> = (
  args: PlayLmsUiSidebarComponent
) => {
  const sidebarItems = [
    {
      title: 'Employees',
      icon: 'supervisedUserCircle',
      routerLink: '/app/employees',
    },
    {
      title: 'Reports',
      icon: 'equalizer',
      routerLink: '/app/reports',
    },
    {
      title: 'Settings',
      icon: 'settings',
      routerLink: '/app/settings',
    },
    {
      title: 'Tags',
      icon: 'loyalty',
      routerLink: '/app/tags',
    },
    {
      title: 'Teams',
      icon: 'groupWork',
      routerLink: '/app/teams',
    },
    {
      title: 'Trainings',
      icon: 'assignment',
      routerLink: '/app/trainings',
    },
    {
      title: 'Videos',
      icon: 'videoLibrary',
      routerLink: '/app/videos',
    },
    {
      title: 'Logout',
      icon: 'logout',
      routerLink: '',
    },
  ];
  return {
    props: args,
    class: {
      sidebarItems: [1, 2, 3, 4],
    },
    template: `
    <play-lms-ui-sidebar>
      <play-lms-ui-sidebar-item>
        <play-icon name="supervisedUserCircle"></play-icon>
        <span>Employees</span>
      </play-lms-ui-sidebar-item>
      <play-lms-ui-sidebar-item>
        <play-icon name="equalizer"></play-icon>
        <span>Reports</span>
      </play-lms-ui-sidebar-item>
      <play-lms-ui-sidebar-item>
        <play-icon name="settings"></play-icon>
        <span>Settings</span>
      </play-lms-ui-sidebar-item>
      <play-lms-ui-sidebar-item>
        <play-icon name="loyalty"></play-icon>
        <span>Tags</span>
      </play-lms-ui-sidebar-item>
      <play-lms-ui-sidebar-item>
        <play-icon name="groupWork"></play-icon>
        <span>Teams</span>
      </play-lms-ui-sidebar-item>
      <play-lms-ui-sidebar-item>
        <play-icon name="assignment"></play-icon>
        <span>Trainings</span>
      </play-lms-ui-sidebar-item>
      <play-lms-ui-sidebar-item>
        <play-icon name="videoLibrary"></play-icon>
        <span>Videos</span>
      </play-lms-ui-sidebar-item>
      <play-lms-ui-sidebar-item>
        <play-icon name="logout"></play-icon>
        <span>Logout</span>
      </play-lms-ui-sidebar-item>
    </play-lms-ui-sidebar>
    `,
  };
};

export const Primary = Template.bind({});
Primary.args = {};
