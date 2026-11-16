import Image from "next/image";
import Link from "next/link";

const logos = [
  { id: "starmed", src: "/images/logos/starmed-logo-main.png", name: "STARMED", w: 1910, h: 558, holo: false },
  { id: "dada", src: "/images/logos/dada-shield.png", name: "DADA", w: 306, h: 351, holo: true },
  { id: "dr-care", src: "/images/logos/drcare-logo.png", name: "Dr.Care", w: 351, h: 345, holo: true },
  { id: "mediz", src: "/images/logos/mediz-logo.png", name: "Mediz", w: 477, h: 186, holo: true },
];

const words = ["Certified", "Clinical-grade", "UAE & GCC", "2,000+ outlets", "CE 0123", "ISO 13485", "MOH"];

export function BrandMarquee() {
  // Four sets per half so the loop stays seamless on very wide screens.
  const row = [...logos, ...logos, ...logos, ...logos];
  const ticker = [...words, ...words, ...words];

  return (
    <section id="brands" aria-label="Our brands" className="relative overflow-hidden border-y border-white/[0.06] bg-deep">
      <div className="grid-dots absolute inset-0 opacity-30" aria-hidden />
      <div className="relative flex items-center">
        <p className="eyebrow absolute left-0 z-10 hidden h-full items-center bg-gradient-to-r from-deep via-deep to-transparent pl-8 pr-16 text-cyan md:flex">
          Our brands
        </p>
        <div className="mask-fade-x flex-1 overflow-hidden py-8">
          <div className="flex w-max animate-marquee items-center hover:[animation-play-state:paused]">
            {[...row, ...row].map((logo, i) => {
              const duplicate = i >= logos.length;
              return (
                <Link
                  key={`${logo.id}-${i}`}
                  href={`/brands#${logo.id}`}
                  aria-hidden={duplicate}
                  tabIndex={duplicate ? -1 : undefined}
                  className="group mx-5 shrink-0 opacity-75 transition-opacity hover:opacity-100"
                >
                  <span
                    className={`grid h-16 place-items-center rounded-2xl px-5 transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-[0_0_30px_-4px_rgba(62,230,255,0.7)] ${
                      logo.holo ? "bg-white/90 group-hover:bg-white" : "border border-white/10 bg-white/[0.04]"
                    }`}
                  >
                    <Image
                      src={logo.src}
                      alt={duplicate ? "" : logo.name}
                      width={logo.w}
                      height={logo.h}
                      className="h-11 w-auto"
                      style={
                        logo.holo
                          ? undefined
                          : {
                              filter:
                                "drop-shadow(0.6px 0 0 rgba(255,255,255,0.9)) drop-shadow(-0.6px 0 0 rgba(255,255,255,0.9)) drop-shadow(0 0.6px 0 rgba(255,255,255,0.9)) drop-shadow(0 -0.6px 0 rgba(255,255,255,0.9))",
                            }
                      }
                    />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Second band: reversed ticker of credentials */}
      <div aria-hidden className="mask-fade-x relative overflow-hidden border-t border-white/[0.06] py-3">
        <div className="flex w-max animate-marquee-rev items-center">
          {[...ticker, ...ticker].map((w, i) => (
            <span key={i} className="flex items-center gap-6 px-6 font-mono text-xs uppercase tracking-[0.25em] text-faint">
              {w}
              <span className="text-cyan">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
