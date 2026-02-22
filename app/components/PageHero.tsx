import Image, { StaticImageData } from "next/image";
import Link from "next/link";

export type PageHeroProps = {
  title: string;
  subtitle?: string;
  imageSrc: StaticImageData;
  ctaLabel?: string;
  ctaHref?: string;
  minHeight?: "sm" | "md" | "lg";
  overlayStrength?: "light" | "medium" | "strong";
};

export default function PageHero({
  title,
  subtitle,
  imageSrc,
  ctaLabel,
  ctaHref,
  minHeight = "md",
  overlayStrength = "medium",
}: PageHeroProps) {
  const minHeightClass = `page-hero--${minHeight}`;
  const overlayClass = `page-hero--overlay-${overlayStrength}`;

  return (
    <section className={`page-hero ${minHeightClass} ${overlayClass}`}>
      <Image
        src={imageSrc}
        alt=""
        fill
        priority
        className="page-hero__image"
        sizes="100vw"
      />
      <div className="page-hero__overlay" aria-hidden="true" />
      <div className="page-hero__content section-shell">
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
        {ctaLabel && ctaHref && (
          <Link href={ctaHref} className="btn-primary">
            {ctaLabel}
          </Link>
        )}
      </div>
    </section>
  );
}
