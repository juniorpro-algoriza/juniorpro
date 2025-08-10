import { useSidebar } from '@atoms';
import { cx } from '@lib';
import { Notifications } from '../../components';

interface LoggedInPageHeaderProps {
  title: string;
  breadcrumbs?: string[];
  showNotifications?: boolean;
  className?: string;
}

export const LoggedInPageHeader = ({
  title,
  breadcrumbs = [],
  showNotifications = true,
  className = '',
}: LoggedInPageHeaderProps) => {
  const { isOpen } = useSidebar();

  const renderBreadcrumbs = () => {
    if (breadcrumbs.length === 0) return null;

    return (
      <p className='pb-2'>
        {breadcrumbs.map((crumb, index) => (
          <span key={index}>
            {index === breadcrumbs.length - 1 ? (
              <span className='text-content-secondary'>{crumb}</span>
            ) : (
              <>
                {crumb}
                {index < breadcrumbs.length - 1 && ' / '}
              </>
            )}
          </span>
        ))}
      </p>
    );
  };

  return (
    <div className={`pb-8 ${className}`}>
      <div>
        <div className='flex items-center justify-between w-full pb-6 border-b border-border-secondary'>
          <div className='flex items-end text-xs gap-2'>
            <h1
              className={cx(
                'text-[28px] font-medium text-yankees-blue mt-2',
                !isOpen && 'pl-12'
              )}
            >
              {title}
            </h1>
            {renderBreadcrumbs()}
          </div>
          {showNotifications && <Notifications />}
        </div>
      </div>
    </div>
  );
};
