export interface NavItem {
  label: string;
  href: string;
  icon?: string;
  badge?: number | string;
  children?: NavItem[];
}

export interface NavGroup {
  title?: string;
  items: NavItem[];
}

export interface Breadcrumb {
  label: string;
  href?: string;
}
