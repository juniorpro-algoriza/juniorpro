'use client';

import {
    DiamondIcon,
    DocumentIcon,
    HomeIcon,
    LogoutIcon,
    SettingsIcon,
    UserIcon,
} from '@icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSidebar } from './SidebarContext';

const menuItems = [
  { href: '/dashboard', icon: HomeIcon, label: 'Dashboard' },
  { href: '/juniors', icon: UserIcon, label: 'Juniors' },
  {
    href: '/projects',
    icon: DocumentIcon,
    label: 'Projects',
  },
  { href: '/points', icon: DiamondIcon, label: 'Points' },
  {
    href: '/profile',
    icon: SettingsIcon,
    label: 'My Profile',
  },
];

export const SidebarNav = () => {
  const pathname = usePathname();
  const { isMobile, toggleSidebar } = useSidebar();

  const isActive = (href: string) => pathname === href;

  const closeSidebar = () => {
    if (isMobile) toggleSidebar();
  };

  return (
    <nav className='flex-1 p-4 overflow-y-auto space-y-2'>
      <ul className='space-y-2'>
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <li key={item.href} style={{ transitionDelay: `${index * 50}ms` }}>
              <Link
                href={item.href}
                onClick={closeSidebar}
                className={`
                  flex items-center space-x-3 px-2 py-3 rounded-xl text-sm transition-all duration-200 
                  ${active ? 'bg-violet-light text-unitedBlue' : 'text-yankees-blue hover:bg-gray-100'}
                `}
              >
                <Icon />
                <p className='truncate'>{item.label}</p>
              </Link>
            </li>
          );
        })}
      </ul>

      <div className='py-4 border-t border-border-secondary'>
        <button
          onClick={closeSidebar}
          className='flex items-center space-x-3 px-2 py-3 rounded-xl text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200 w-full cursor-pointer'
        >
          <LogoutIcon />
          <span className='truncate'>Logout</span>
        </button>
      </div>
    </nav>
  );
};
