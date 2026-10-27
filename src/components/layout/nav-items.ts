export interface NavItem {
  to: string
  key: 'home' | 'services' | 'industries' | 'brands' | 'shop' | 'contact'
  end: boolean
}

export const navItems: NavItem[] = [
  { to: '/', key: 'home', end: true },
  { to: '/services', key: 'services', end: false },
  { to: '/industries', key: 'industries', end: false },
  { to: '/brands', key: 'brands', end: false },
  { to: '/shop', key: 'shop', end: false },
  { to: '/contact', key: 'contact', end: false },
]
