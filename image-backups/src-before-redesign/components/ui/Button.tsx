import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

const variants = {
  /** Primary: luminous cyan→lime fill with a bloom on hover. */
  primary:
    "bg-[linear-gradient(110deg,#4b7bff,#36b0c9_45%,#9bd62a)] text-void shadow-[0_0_0_1px_rgba(255,255,255,0.15)_inset,0_10px_40px_-10px_rgba(75,123,255,0.6)] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.3)_inset,0_14px_60px_-8px_rgba(75,123,255,0.85)]",
  /** Glass: translucent with a light running around its border. */
  glass: "edge-spin glass text-fg hover:bg-white/10",
  ghost: "border border-white/15 text-fg hover:border-cyan/60 hover:bg-cyan/[0.06]",
};

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: keyof typeof variants | "lime" | "outline" | "ink" | "outlineDark";
  icon?: ReactNode;
  className?: string;
};

const legacy: Record<string, keyof typeof variants> = {
  lime: "primary",
  ink: "primary",
  outline: "glass",
  outlineDark: "ghost",
};

export function Button({ href, children, variant = "primary", icon, className = "" }: ButtonProps) {
  const external = !href.startsWith("/");
  const v = variants[(legacy[variant] ?? variant) as keyof typeof variants];
  const classes = `group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full py-3.5 pl-6 pr-3.5 text-sm font-semibold tracking-tight transition-all duration-500 ease-premium ${v} ${className}`;
  const content = (
    <>
      {/* Sheen that sweeps across on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/30 opacity-0 blur-md transition-all duration-700 ease-premium group-hover:left-[120%] group-hover:opacity-100"
      />
      <span className="relative">{children}</span>
      <span
        className={`relative grid size-7 place-items-center rounded-full transition-transform duration-500 ease-premium group-hover:rotate-45 ${
          v === variants.primary ? "bg-void/90 text-cyan" : "bg-white/10 text-cyan"
        }`}
      >
        {icon ?? <ArrowUpRight className="size-3.5" aria-hidden />}
      </span>
    </>
  );

  if (external) {
    const opensTab = href.startsWith("http");
    return (
      <a href={href} className={classes} {...(opensTab ? { target: "_blank", rel: "noreferrer" } : {})}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}
