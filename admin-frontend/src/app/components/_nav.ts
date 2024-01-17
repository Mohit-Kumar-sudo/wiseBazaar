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
    id: 'accountStatement',
    name: 'Account Statement',
    url: '/portal/dashboard',
    icon: 'fa-file-invoice',
    class: 'item',
  },
  {
    id: 'topWinners',
    name: 'Top Winners',
    url: '/portal/dashboard',
    icon: 'fa-trophy',
    class: 'item',
  },
  {
    id: 'history',
    name: 'History',
    url: '/portal/dashboard',
    icon: 'fa-history',
    class: 'item',
  },
  {
    id: 'notification',
    name: 'Notification',
    url: '/portal/dashboard',
    icon: 'fa-bell',
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
    id: 'user',
    name: 'User',
    url: '/portal/user/list',
    icon: 'fa-users',
    class: 'item',
  },
  {
    id: 'event',
    name: 'Event',
    url: '/portal/event/list',
    icon: 'fa-file-invoice',
    class: 'item',
  },
  {
    id: 'result',
    name: 'Result',
    url: '/portal/result/list',
    icon: 'fa-trophy',
    class: 'item',
  },
  {
    id: 'starline',
    name: 'Starline',
    url: '/portal/kalyan-starline/list',
    icon: 'fa-cog',
    class: 'item',
  },
  {
    id: 'notification',
    name: 'Notification',
    url: '/portal/notification/list',
    icon: 'fa-envelope-open',
    class: 'item',
  },
];
