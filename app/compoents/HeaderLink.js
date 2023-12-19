'use client';

import stryles from '@/styles/components.module.css';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function HeaderLink({ label, href, className, children, ...props }) {
  const pathname = usePathname();

  const activeClass = pathname === href ? stryles.active : '';
  const baseClassName = `${stryles.headerLink} ${activeClass} ${className ?? ''}`;

  return <>
    <Link className={baseClassName} href={href} {...props}>
      {children ?? label}
    </Link>
  </>;
};
