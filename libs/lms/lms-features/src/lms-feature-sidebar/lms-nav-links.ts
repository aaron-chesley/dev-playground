import { AuthUser } from '@playground/lms-data';
import { PlayIconName } from '@playground/play-ui';

export interface LmsNavLink {
  title: string;
  icon: PlayIconName;
  routerLink: string;
}

const lmsNavLinks: LmsNavLink[] = [
  {
    title: 'Training History',
    icon: 'history',
    routerLink: '/app/history',
  },
  {
    title: 'Dashboard',
    icon: 'dashboard',
    routerLink: '/app/dashboard',
  },
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
    title: 'Tenants',
    icon: 'business',
    routerLink: '/app/tenants',
  },
];

const getSupervisorNavLinks = (): LmsNavLink[] => {
  const supervisorLinks = [
    'Employees',
    'Reports',
    'Settings',
    'Tags',
    'Teams',
    'Trainings',
    'Videos',
    'Tenants',
  ];
  return lmsNavLinks.filter((navLink) =>
    supervisorLinks.includes(navLink.title)
  );
};

const getAdminNavLinks = (): LmsNavLink[] => {
  const adminLinks = [
    'Dashboard',
    'Training History',
    'Employees',
    'Reports',
    'Settings',
    'Tags',
    'Teams',
    'Trainings',
    'Videos',
  ];
  return lmsNavLinks.filter((navLink) => adminLinks.includes(navLink.title));
};

const getEmployeeNavLinks = (): LmsNavLink[] => {
  const employeeLinks = ['Dashboard', 'Training History'];
  return lmsNavLinks.filter((navLink) => employeeLinks.includes(navLink.title));
};

export const getNavLinksFromUserType = (user: AuthUser): LmsNavLink[] => {
  if (user.is_superuser) {
    return getSupervisorNavLinks();
  }
  if (user.is_admin) {
    return getAdminNavLinks();
  }
  return getEmployeeNavLinks();
};
