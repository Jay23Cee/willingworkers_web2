"use client";

import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { useEffect, useState, type ComponentType, type SVGProps } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bus, CoachIcon, HandsIcon } from "../public/assets/page";
import homeSlide1 from "../public/assets/professional/home/hero-slide-1.webp";
import homeSlide2 from "../public/assets/professional/home/hero-slide-2.webp";
import homeSlide3 from "../public/assets/professional/home/hero-slide-3.webp";
import homeSlide4 from "../public/assets/professional/home/hero-slide-4.webp";
import promoAbout from "../public/assets/professional/home/promo-about.webp";
import promoPrograms from "../public/assets/professional/home/promo-programs.webp";
import missionImage from "../public/assets/professional/home/mission.webp";
import quoteImage from "../public/assets/professional/home/community-quote.webp";
import PrimaryCtaBar from "./components/PrimaryCtaBar";
import SectionIntro from "./components/SectionIntro";
import { Footer } from "./Footer";
import Nav from "./Nav";

type HighlightCard = {
  title: string;
  description: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
};

const heroSlides: StaticImageData[] = [
  homeSlide1,
  homeSlide2,
  homeSlide3,
  homeSlide4,
];

const highlightCards: HighlightCard[] = [
  {
    title: "Private Transportation",
    description:
      "Reliable weekday transportation helps participants arrive safely and stay connected to daily routines.",
    Icon: Bus,
  },
  {
    title: "Community Integration",
    description:
      "Guided experiences build confidence, social awareness, and practical skills for independent living.",
    Icon: CoachIcon,
  },
  {
    title: "Social Recreation",
    description:
      "Purposeful activities encourage creativity, friendships, and healthy habits in a supportive environment.",
    Icon: HandsIcon,
  },
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCurrentSlide((previousSlide) => (previousSlide + 1) % heroSlides.length);
    }, 6500);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="home-page">
      <Nav currentPage="home" showPrimaryCta primaryCtaHref="/programs" primaryCtaLabel="Explore Programs" />

      <main className="home-main">
        <section className="home-hero">
          <AnimatePresence initial={false}>
            <motion.div
              key={currentSlide}
              className="home-hero__slide"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.1, ease: "easeOut" }}
            >
              <Image
                src={heroSlides[currentSlide]}
                alt=""
                fill
                priority={currentSlide === 0}
                className="home-hero__image"
                sizes="100vw"
              />
            </motion.div>
          </AnimatePresence>

          <div className="home-hero__overlay" aria-hidden="true" />
          <div className="home-hero__content section-shell">
            <p className="home-hero__eyebrow">Inclusive Adult Day Program</p>
            <h1>Helping adults build independence, confidence, and community.</h1>
            <p>
              Willing Workers partners with families and participants to deliver
              practical support, meaningful activities, and a safe daily
              environment.
            </p>
            <div className="home-hero__actions">
              <Link href="/programs" className="btn-primary">
                Explore Programs
              </Link>
              <Link href="/about" className="btn-secondary">
                Learn About Our Mission
              </Link>
            </div>
          </div>
        </section>

        <section className="home-promo-grid section-shell">
          <Link href="/programs" className="home-promo-card">
            <Image src={promoPrograms} alt="" fill sizes="(max-width: 900px) 100vw, 50vw" />
            <span className="home-promo-card__overlay" aria-hidden="true" />
            <div className="home-promo-card__content">
              <h2>Programs Built Around Real Needs</h2>
              <p>See how daily programming supports growth, routine, and self-advocacy.</p>
            </div>
          </Link>

          <Link href="/about" className="home-promo-card">
            <Image src={promoAbout} alt="" fill sizes="(max-width: 900px) 100vw, 50vw" />
            <span className="home-promo-card__overlay" aria-hidden="true" />
            <div className="home-promo-card__content">
              <h2>Meet the Team Behind the Care</h2>
              <p>Learn how our staff creates a respectful and dependable support experience.</p>
            </div>
          </Link>
        </section>

        <section className="home-highlights section-shell">
          <SectionIntro
            eyebrow="What We Provide"
            title="Services that support long-term independence"
            description="Our programs combine structured training, community engagement, and wellness support so each participant can thrive at their own pace."
            centered
          />

          <div className="home-highlight-grid">
            {highlightCards.map(({ title, description, Icon }) => (
              <article key={title} className="home-highlight-card">
                <div className="home-highlight-card__icon" aria-hidden="true">
                  <Icon width={74} height={74} />
                </div>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="home-mission section-shell">
          <div className="home-mission__media">
            <Image
              src={missionImage}
              alt="Program staff and participants working together in a group session"
              fill
              sizes="(max-width: 980px) 100vw, 48vw"
            />
          </div>
          <article className="home-mission__content">
            <h2>Our mission is simple and consistent.</h2>
            <p>
              We assist adults with intellectual and developmental disabilities by
              strengthening life skills, encouraging self-advocacy, and promoting
              healthy routines.
            </p>
            <p>
              Every service is designed to increase safety, dignity, and
              participation in community life.
            </p>
            <Link href="/about" className="btn-secondary">
              Read Full Mission
            </Link>
          </article>
        </section>

        <PrimaryCtaBar
          title="Ready to find the right program?"
          description="Contact our team to discuss goals, availability, and the best next step for your family."
          ctaLabel="Schedule a Tour"
          ctaHref="/contact"
        />

        <section className="home-community-quote">
          <Image src={quoteImage} alt="" fill sizes="100vw" className="home-community-quote__image" />
          <div className="home-community-quote__overlay" aria-hidden="true" />
          <blockquote>
            Dedicated to creating meaningful opportunities for growth, dignity,
            and belonging in our community.
          </blockquote>
        </section>
      </main>

      <Footer />
    </div>
  );
}
