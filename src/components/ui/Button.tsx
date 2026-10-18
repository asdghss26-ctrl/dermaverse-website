"use client";

import { cn } from "@/lib/utils";
import { forwardRef, type ButtonHTMLAttributes, type AnchorHTMLAttributes } from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Render as an anchor tag */
  href?: string;
  /** Open link in new tab */
  external?: boolean;
  className?: string;
  children: React.ReactNode;
}

export type ButtonProps = ButtonBaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps>;

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-gold text-emerald-deep hover:bg-gold-light active:bg-gold-light border-2 border-gold hover:border-gold-light",
  secondary:
    "bg-transparent text-emerald-brand border-2 border-emerald-brand hover:bg-emerald-brand hover:text-white",
  ghost:
    "bg-transparent text-emerald-brand border-2 border-transparent hover:bg-sage",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm min-h-[40px]",
  md: "px-6 py-3 text-base min-h-[48px]",
  lg: "px-8 py-4 text-lg min-h-[56px]",
};

export const Button = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(function Button(
  {
    variant = "primary",
    size = "md",
    href,
    external,
    className,
    children,
    disabled,
    ...rest
  },
  ref
) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 font-semibold rounded-full",
    "transition-all duration-200 ease-in-out",
    "focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-2",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    "cursor-pointer select-none whitespace-nowrap",
    variantStyles[variant],
    sizeStyles[size],
    className
  );

  if (href && !disabled) {
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        className={classes}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      className={classes}
      disabled={disabled}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
});
