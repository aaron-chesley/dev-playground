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
  PlayIconComponent,
  PlayIconRegistryService,
  settings,
  supervisedUserCircle,
  videoLibrary,
} from '@playground/play-ui';
import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { LmsUiSidebarComponent } from './lms-ui-sidebar.component';
import { LmsUiSidebarItemComponent } from '../lms-ui-sidebar-item/lms-ui-sidebar-item.component';

export default {
  title: 'LmsUiSidebarComponent',
  component: LmsUiSidebarComponent,
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
        LmsUiSidebarItemComponent,
        PlayIconComponent,
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
} as Meta<LmsUiSidebarComponent>;

const Template: Story<LmsUiSidebarComponent> = (
  args: LmsUiSidebarComponent
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
    <lms-ui-sidebar>
      <lms-ui-sidebar-item>
        <play-icon name="supervisedUserCircle"></play-icon>
        <span>Employees</span>
      </lms-ui-sidebar-item>
      <lms-ui-sidebar-item>
        <play-icon name="equalizer"></play-icon>
        <span>Reports</span>
      </lms-ui-sidebar-item>
      <lms-ui-sidebar-item>
        <play-icon name="settings"></play-icon>
        <span>Settings</span>
      </lms-ui-sidebar-item>
      <lms-ui-sidebar-item>
        <play-icon name="loyalty"></play-icon>
        <span>Tags</span>
      </lms-ui-sidebar-item>
      <lms-ui-sidebar-item>
        <play-icon name="groupWork"></play-icon>
        <span>Teams</span>
      </lms-ui-sidebar-item>
      <lms-ui-sidebar-item>
        <play-icon name="assignment"></play-icon>
        <span>Trainings</span>
      </lms-ui-sidebar-item>
      <lms-ui-sidebar-item>
        <play-icon name="videoLibrary"></play-icon>
        <span>Videos</span>
      </lms-ui-sidebar-item>
      <lms-ui-sidebar-item>
        <play-icon name="logout"></play-icon>
        <span>Logout</span>
      </lms-ui-sidebar-item>
    </lms-ui-sidebar>
    `,
  };
};

export const Primary = Template.bind({});
Primary.args = {};
