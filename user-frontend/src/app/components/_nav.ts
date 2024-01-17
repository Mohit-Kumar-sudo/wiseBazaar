export interface INavAttributes {
  [propName: string]: any;
}
export interface INavWrapper {
  attributes: INavAttributes;
  element: string;
}
export interface INavBadge {
  text: string;
  variant: string;
  class?: string;
}
export interface INavLabel {
  class?: string;
  variant: string;
}
export interface INavLinkProps {
  queryParams?: {
    [k: string]: any;
  };
  fragment?: string;
  queryParamsHandling?: 'merge' | 'preserve' | '';
  preserveFragment?: boolean;
  skipLocationChange?: boolean;
  replaceUrl?: boolean;
  state?: {
    [k: string]: any;
  };
  routerLinkActiveOptions?: {
    exact: boolean;
  };
  routerLinkActive?: string | string[];
}
export interface INavData {
  id?: string;
  name?: string;
  url?: string | any[];
  href?: string;
  icon?: string;
  badge?: INavBadge;
  title?: boolean;
  children?: INavData[];
  variant?: string;
  attributes?: INavAttributes;
  divider?: boolean;
  class?: string;
  label?: INavLabel;
  wrapper?: INavWrapper;
  linkProps?: INavLinkProps;
  [propName: string]: any;
}
export interface INavWrapper {
  attributes: INavAttributes;
  element: string;
}
export interface INavBadge {
  text: string;
  variant: string;
  class?: string;
}
export interface INavLabel {
  class?: string;
  variant: string;
}
export interface INavLinkProps {
  queryParams?: {
    [k: string]: any;
  };
  fragment?: string;
  queryParamsHandling?: 'merge' | 'preserve' | '';
  preserveFragment?: boolean;
  skipLocationChange?: boolean;
  replaceUrl?: boolean;
  state?: {
    [k: string]: any;
  };
  routerLinkActiveOptions?: {
    exact: boolean;
  };
  routerLinkActive?: string | string[];
}
export interface INavData {
  name?: string;
  url?: string | any[];
  href?: string;
  icon?: string;
  badge?: INavBadge;
  title?: boolean;
  children?: INavData[];
  variant?: string;
  attributes?: INavAttributes;
  divider?: boolean;
  class?: string;
  label?: INavLabel;
  wrapper?: INavWrapper;
  linkProps?: INavLinkProps;
}

export const UserNavItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/portal/dashboard',
    icon: 'fa-tachometer-alt',
    class: 'item',
  },
  {
    id: 'profile',
    name: 'Profile',
    url: '/portal/sidebale/profile',
    icon: 'fa-user',
    class: 'item',
  },
  {
    id: 'history',
    name: 'History',
    url: '/portal/sidebale/history',
    icon: 'fa-history',
    class: 'item',
  },
  {
    id: 'accountStatement',
    name: 'Account Statement',
    url: '/portal/sidebale/account-statement',
    icon: 'fa-file-invoice',
    class: 'item',
  },
  {
    id: 'notification',
    name: 'Notification',
    url: '/portal/sidebale/notification',
    icon: 'fa-bell',
    class: 'item',
  },
  {
    id: 'gamesRate',
    name: 'Game Rate',
    url: '/portal/sidebale/games-rate',
    icon: 'fa-star',
    class: 'item',
  },
  {
    id: 'noticeBoard',
    name: 'Notice Board/Rules',
    url: '/portal/sidebale/notice-rule',
    icon: 'fa-comment',
    class: 'item',
  },
  {
    id: 'setting',
    name: 'Setting',
    url: '/portal/setting/configuration',
    icon: 'fa-cog',
    class: 'item',
  },
];

export const adminNavItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/portal/dashboard',
    icon: 'fa-tachometer-alt',
    class: 'item',
  },
  {
    id: 'accountStatement',
    name: 'Account Statement',
    url: '/portal/dashboard',
    icon: 'fa-question-circle',
    class: 'item',
  },
  {
    id: 'topWinners',
    name: 'Top Winners',
    url: '/portal/dashboard',
    icon: 'fa-question-circle',
    class: 'item',
  },
  {
    id: 'history',
    name: 'History',
    url: '/portal/dashboard',
    icon: 'fa-question-circle',
    class: 'item',
  },
  {
    id: 'notification',
    name: 'Notification',
    url: '/portal/dashboard',
    icon: 'fa-question-circle',
    class: 'item',
  },
  {
    id: 'gamesRate',
    name: 'Game Rate',
    url: '/portal/sidebale/games-rate',
    icon: 'fa-question-circle',
    class: 'item',
  },
];
