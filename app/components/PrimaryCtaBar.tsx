import Link from "next/link";

export type PrimaryCtaBarProps = {
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
};

export default function PrimaryCtaBar({
  title,
  description,
  ctaLabel,
  ctaHref,
}: PrimaryCtaBarProps) {
  return (
    <section className="primary-cta-bar section-shell">
      <div className="primary-cta-bar__copy">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <Link href={ctaHref} className="btn-primary">
        {ctaLabel}
      </Link>
    </section>
  );
}
