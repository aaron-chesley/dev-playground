import { AuthUser } from '@playground/lms-data';

export interface LmsNavLink {
  title: string;
  icon: string;
  routerLink: string;
}

const lmsNavLinks: LmsNavLink[] = [
  {
    title: $localize`Training History`,
    icon: 'history',
    routerLink: '/app/history',
  },
  {
    title: $localize`Dashboard`,
    icon: 'dashboard',
    routerLink: '/app/dashboard',
  },
  {
    title: $localize`Employees`,
    icon: 'supervisedUserCircle',
    routerLink: '/app/employees',
  },
  {
    title: $localize`Reports`,
    icon: 'equalizer',
    routerLink: '/app/reports',
  },
  {
    title: $localize`Settings`,
    icon: 'settings',
    routerLink: '/app/settings',
  },
  {
    title: $localize`Tags`,
    icon: 'loyalty',
    routerLink: '/app/tags',
  },
  {
    title: $localize`Teams`,
    icon: 'groupWork',
    routerLink: '/app/teams',
  },
  {
    title: $localize`Trainings`,
    icon: 'assignment',
    routerLink: '/app/trainings',
  },
  {
    title: $localize`Content`,
    icon: 'videoLibrary',
    routerLink: '/app/content',
  },
  {
    title: $localize`Tenants`,
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
    'Content',
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
    'Content',
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
