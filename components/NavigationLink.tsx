'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { getTestId } from '@/lib/test-ids';

interface NavigationLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  mobile?: boolean;
  footer?: boolean;
  onClick?: () => void;
}

export function NavigationLink({
  href,
  children,
  className,
  mobile = false,
  footer = false,
  onClick,
}: NavigationLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  const baseClasses = mobile
    ? 'block px-4 py-3 rounded-[34px] transition-colors'
    : footer
      ? 'transition-colors text-sm'
      : 'transition-colors';

  const activeClasses = mobile
    ? 'text-stone-900 bg-stone-100 font-medium'
    : footer
      ? 'text-white font-medium'
      : 'text-stone-900 font-medium';

  const inactiveClasses = mobile
    ? 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
    : footer
      ? 'text-stone-300 hover:text-white'
      : 'text-stone-600 hover:text-stone-900';

  return (
    <Link
      href={href}
      {...getTestId('navItem')}
      className={cn(
        baseClasses,
        isActive ? activeClasses : inactiveClasses,
        className
      )}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}
