import { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

export default function Button({
  children,
  className,
  variant = 'primary',
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        'rounded-lg px-6 py-3 font-display text-lg transition-all duration-200',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variant === 'primary' && [
          'bg-amber-600 hover:bg-amber-700 active:bg-amber-800',
          'border-2 border-amber-500 hover:border-amber-400',
          'text-white shadow-lg hover:shadow-xl',
        ],
        variant === 'secondary' && [
          'bg-stone-700 hover:bg-stone-600 active:bg-stone-800',
          'border-2 border-stone-600 hover:border-stone-500',
          'text-stone-200 shadow-lg hover:shadow-xl',
        ],
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
