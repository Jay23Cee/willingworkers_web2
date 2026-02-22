export type SectionIntroProps = {
  eyebrow?: string;
  title: string;
  description: string;
  centered?: boolean;
};

export default function SectionIntro({
  eyebrow,
  title,
  description,
  centered = false,
}: SectionIntroProps) {
  return (
    <header className={`section-intro${centered ? " section-intro--centered" : ""}`}>
      {eyebrow && <p className="section-intro__eyebrow">{eyebrow}</p>}
      <h2>{title}</h2>
      <p>{description}</p>
    </header>
  );
}
