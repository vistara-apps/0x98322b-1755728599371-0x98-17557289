
"use client";

import { ReactNode } from 'react';
import { cn } from '../lib/utils';

interface AppShellProps {
  children: ReactNode;
  variant?: 'default' | 'glass';
  className?: string;
}

export function AppShell({ children, variant = 'default', className }: AppShellProps) {
  return (
    <div
      className={cn(
        'min-h-screen',
        variant === 'glass' 
          ? 'bg-gradient-to-br from-bg via-surface to-bg backdrop-blur-3xl'
          : 'bg-bg',
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-6">
        {children}
      </div>
    </div>
  );
}
