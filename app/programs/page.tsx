"use client";

import Image, { StaticImageData } from "next/image";
import programHero from "../../public/assets/professional/programs/hero.webp";
import behavioralSupportImage from "../../public/assets/professional/programs/behavioral-support.webp";
import creativeExpressionImage from "../../public/assets/professional/programs/creative-expression.webp";
import communicationImage from "../../public/assets/professional/programs/communication-language.webp";
import recreationImage from "../../public/assets/professional/programs/recreation.webp";
import lifeSkillsImage from "../../public/assets/professional/programs/life-skills.webp";
import PrimaryCtaBar from "../components/PrimaryCtaBar";
import PageHero from "../components/PageHero";
import SectionIntro from "../components/SectionIntro";
import { Footer } from "../Footer";
import Nav from "../Nav";

export type ProgramCardModel = {
  key: string;
  title: string;
  summary: string;
  imageSrc: StaticImageData;
  audience?: string;
  duration?: string;
};

const programs: ProgramCardModel[] = [
  {
    key: "behavioral-support",
    title: "Behavioral Support Program",
    summary:
      "Individualized support plans help participants build self-regulation, communication, and social confidence.",
    imageSrc: behavioralSupportImage,
    audience: "Adults 18+",
  },
  {
    key: "creative-expression",
    title: "Creative Expression and Art Therapy",
    summary:
      "Guided art sessions offer practical ways to process emotions, build focus, and develop creative strengths.",
    imageSrc: creativeExpressionImage,
    audience: "Adults 18+",
  },
  {
    key: "communication-language",
    title: "Communication and Language Development",
    summary:
      "Participants strengthen vocabulary, social interaction, and self-advocacy through structured activities.",
    imageSrc: communicationImage,
    audience: "Adults 18+",
  },
  {
    key: "recreation",
    title: "Recreation and Leisure Skills",
    summary:
      "Community outings, group activities, and adaptive recreation support wellness and meaningful social participation.",
    imageSrc: recreationImage,
    audience: "Adults 18+",
  },
  {
    key: "life-skills",
    title: "Life Skills and Independence Training",
    summary:
      "Hands-on training in routines like budgeting, hygiene, and daily planning supports long-term independence.",
    imageSrc: lifeSkillsImage,
    audience: "Adults 18+",
  },
];

export default function Programs() {
  return (
    <div className="programs-page">
      <Nav currentPage="programs" showPrimaryCta primaryCtaHref="/programs" primaryCtaLabel="Explore Programs" />

      <main>
        <PageHero
          title="Programs"
          subtitle="Structured, inclusive services designed to support confidence, independence, and community participation."
          imageSrc={programHero}
          ctaLabel="Contact Our Team"
          ctaHref="/contact"
          minHeight="sm"
          overlayStrength="medium"
        />

        <section className="programs-section section-shell">
          <SectionIntro
            eyebrow="What We Offer"
            title="Program options tailored to individual goals"
            description="Each service is delivered with clear routines, consistent staff support, and practical outcomes that matter in day-to-day life."
            centered
          />

          <ul className="programs-grid">
            {programs.map((program) => (
              <li key={program.key}>
                <article className="program-card">
                  <div className="program-card__image-wrap">
                    <Image
                      src={program.imageSrc}
                      alt={program.title}
                      fill
                      sizes="(max-width: 800px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>

                  <div className="program-card__body">
                    <h3>{program.title}</h3>
                    <p>{program.summary}</p>
                    <div className="program-card__meta">
                      {program.audience && <span>{program.audience}</span>}
                      {program.duration && <span>{program.duration}</span>}
                    </div>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </section>

        <PrimaryCtaBar
          title="Need guidance on where to start?"
          description="We can walk you through program fit, availability, and enrollment steps."
          ctaLabel="Schedule a Tour"
          ctaHref="/contact"
        />
      </main>

      <Footer />
    </div>
  );
}
