"use client";

import Image from "next/image";
import Link from "next/link";
import aboutHero from "../../public/assets/professional/about/hero.webp";
import missionImage from "../../public/assets/professional/about/mission.webp";
import valuesImage from "../../public/assets/professional/about/values.webp";
import PrimaryCtaBar from "../components/PrimaryCtaBar";
import PageHero from "../components/PageHero";
import SectionIntro from "../components/SectionIntro";
import { Footer } from "../Footer";
import Nav from "../Nav";

const directionUrl =
  "https://www.google.com/maps/dir/?api=1&destination=" +
  encodeURI("4813 W. Washington Blvd., Los Angeles, CA 90016");

export default function About() {
  return (
    <div className="about-page">
      <Nav currentPage="about" showPrimaryCta primaryCtaHref="/programs" primaryCtaLabel="Explore Programs" />

      <main>
        <PageHero
          title="About Us"
          subtitle="A trusted team focused on dignity, practical support, and inclusive community outcomes."
          imageSrc={aboutHero}
          ctaLabel="Explore Programs"
          ctaHref="/programs"
          minHeight="sm"
          overlayStrength="medium"
        />

        <section className="about-section section-shell">
          <SectionIntro
            eyebrow="Who We Are"
            title="Committed to reliable, person-centered support"
            description="Willing Workers partners with participants and families to create stable daily routines, practical life-skill development, and stronger community belonging."
            centered
          />

          <div className="about-story-grid">
            <article className="about-story-card">
              <h2>Our Mission</h2>
              <p>
                We empower adults with intellectual and developmental
                disabilities to build independent, self-directed lives through
                community integration, healthy habits, and structured support.
              </p>
              <p>
                Our programs focus on safety, personal wellness, physical
                activity, emergency readiness, and social confidence so each
                participant can grow with dignity.
              </p>
            </article>

            <div className="about-story-media">
              <Image
                src={missionImage}
                alt="Staff member supporting adults in a collaborative training activity"
                fill
                sizes="(max-width: 1024px) 100vw, 46vw"
              />
            </div>
          </div>

          <div className="about-values-grid">
            <div className="about-values-media">
              <Image
                src={valuesImage}
                alt="Participants and team members engaged in a welcoming group environment"
                fill
                sizes="(max-width: 1024px) 100vw, 46vw"
              />
            </div>

            <article className="about-story-card">
              <h2>Our Values</h2>
              <p>
                Compassion, respect, and accountability shape every service we
                deliver. We value transparency with families, consistency in
                care, and inclusive participation in every setting.
              </p>
              <p>
                We believe growth happens through partnership. That is why we
                work closely with participants, caregivers, and the broader
                community to support long-term success.
              </p>
            </article>
          </div>
        </section>

        <section className="about-tour section-shell">
          <h2>Schedule a tour</h2>
          <p>
            Visit our center to learn more about programs, daily schedules, and
            enrollment support.
          </p>
          <p>
            <Link href={directionUrl} target="_blank" rel="noreferrer">
              4813 W. Washington Blvd., Los Angeles, CA 90016
            </Link>
          </p>
          <p>Monday - Friday, 8:00am - 3:00pm</p>
          <p>
            Phone: <a href="tel:3239375950">(323) 937-5950</a>
          </p>
        </section>

        <PrimaryCtaBar
          title="Ready to learn more?"
          description="Our team can help you understand program fit and next steps."
          ctaLabel="Contact Us"
          ctaHref="/contact"
        />
      </main>

      <Footer />
    </div>
  );
}
