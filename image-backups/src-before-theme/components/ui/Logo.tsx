import Image from "next/image";
import { site } from "@/data/site";

type LogoProps = {
  className?: string;
  priority?: boolean;
  /** Kept for existing call sites; the official logo is always shown in its original colours. */
  variant?: "dark" | "light";
  /** Set false to show the bare logo (e.g. when it already sits on a white surface). */
  glow?: boolean;
};

/** Hairline white edge traced around the mark, so the navy "Med" reads on dark backgrounds. */
const EDGE =
  "drop-shadow(0.6px 0 0 rgba(255,255,255,0.9)) drop-shadow(-0.6px 0 0 rgba(255,255,255,0.9)) drop-shadow(0 0.6px 0 rgba(255,255,255,0.9)) drop-shadow(0 -0.6px 0 rgba(255,255,255,0.9))";

/**
 * The official logo, never recoloured. On the dark theme it sits in a soft light aura
 * with a crisp white edge, so it stands out without a solid background.
 */
export function Logo({ className = "h-10", priority, glow = true }: LogoProps) {
  if (!glow) {
    return (
      <Image
        src="/images/logos/starmed-logo-main.png"
        alt={site.name}
        width={1910}
        height={558}
        priority={priority}
        className={`w-auto ${className}`}
      />
    );
  }

  return (
    <span className="group/logo relative inline-flex isolate">
      <span
        aria-hidden
        className="absolute -inset-x-[12%] -inset-y-[30%] -z-10 rounded-full bg-[radial-gradient(closest-side,rgba(150,200,255,0.55),rgba(62,230,255,0.18)_55%,transparent)] blur-[10px] transition-opacity duration-500 group-hover/logo:opacity-100 opacity-85"
      />
      <Image
        src="/images/logos/starmed-logo-main.png"
        alt={site.name}
        width={1910}
        height={558}
        priority={priority}
        style={{ filter: EDGE }}
        className={`w-auto ${className}`}
      />
    </span>
  );
}
