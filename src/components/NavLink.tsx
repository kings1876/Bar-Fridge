import React from 'react';
import { useShop } from '../context/ShopContext';
import { NavOptions } from '../context/ShopContext';
import { PageView } from '../types';

interface NavLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  page: PageView;
  options?: NavOptions;
  onBeforeNavigate?: () => void;
  children: React.ReactNode;
}

export const NavLink: React.FC<NavLinkProps> = ({
  page,
  options,
  onBeforeNavigate,
  children,
  onClick,
  ...rest
}) => {
  const { navigateTo, getPath } = useShop();
  const href = getPath(page, options);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented) return;
    // Let the browser handle modified clicks and middle-click natively
    // (open in new tab, open in new window, etc.)
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
      return;
    }
    e.preventDefault();
    onBeforeNavigate?.();
    navigateTo(page, options);
  };

  return (
    <a href={href} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
};
