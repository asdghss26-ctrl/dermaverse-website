"use client";

import { cn } from "@/lib/utils";
import { forwardRef, type ButtonHTMLAttributes, type AnchorHTMLAttributes } from "react";

export type ButtonVariant =
  | "primary"
  | "primary-on-dark"
  | "secondary"
  | "secondary-on-dark"
  | "secondary-outline-cream"
  | "ghost";
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
    "bg-forest text-cream border border-forest hover:bg-deep-green hover:border-deep-green hover:text-cream hover:underline hover:decoration-sand hover:underline-offset-4",
  "primary-on-dark":
    "bg-cream text-forest border border-cream hover:bg-taupe hover:border-taupe hover:text-forest hover:underline hover:decoration-sand hover:underline-offset-4",
  secondary:
    "bg-transparent text-brown border-[1.5px] border-brown hover:bg-forest hover:border-forest hover:text-cream",
  "secondary-on-dark":
    "bg-transparent text-taupe border-[1.5px] border-taupe hover:bg-taupe hover:text-forest",
  "secondary-outline-cream":
    "bg-transparent text-cream border-[1.5px] border-cream hover:bg-cream hover:text-forest",
  ghost:
    "bg-transparent text-brown border border-transparent hover:text-sand-strong hover:underline hover:decoration-sand hover:underline-offset-4",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-5 py-2.5 text-[11px] min-h-[44px]",
  md: "px-7 py-3.5 text-[11px] min-h-[48px]",
  lg: "px-9 py-4 text-xs min-h-[56px]",
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
    "inline-flex items-center justify-center gap-2.5 rounded-full",
    "uppercase tracking-[0.14em] font-medium",
    "transition-all duration-300 ease-in-out",
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
