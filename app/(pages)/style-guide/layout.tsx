import Link from 'next/link';
import type { ReactNode } from 'react';
import { linkStyle } from './styles';

interface StylePagesLayoutProps {
  children: ReactNode;
}

const links = ['button', 'input', 'tabs', 'colors', 'select', 'table'];

const StylePagesLayout = ({ children }: StylePagesLayoutProps) => {
  return (
    <div className='py-8'>
      <nav className='px-4 py-4 border border-black'>
        <ul className='flex gap-2'>
          {links.map((l) => {
            return (
              <li key={l}>
                <Link className={linkStyle} href={`/style-guide/${l}`}>
                  {l}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className='flex flex-col items-center justify-center py-4'>
        {children}
      </div>
    </div>
  );
};

export default StylePagesLayout;
