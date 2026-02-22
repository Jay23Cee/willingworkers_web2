"use client";

import { GoogleMap, InfoWindow, LoadScript, MarkerF } from "@react-google-maps/api";
import Link from "next/link";
import { useState } from "react";
import contactHero from "../../public/assets/professional/contact/hero.webp";
import PageHero from "../components/PageHero";
import PrimaryCtaBar from "../components/PrimaryCtaBar";
import { Footer } from "../Footer";
import Nav from "../Nav";

const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

const mapOptions = {
  disableDefaultUI: true,
  zoomControl: true,
};

const center = {
  lat: 34.03987169154813,
  lng: -118.34399681590634,
};

const directionUrl =
  "https://www.google.com/maps/dir/?api=1&destination=" +
  encodeURI("4813 W. Washington Blvd., Los Angeles, CA 90016");

export default function Contact() {
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  return (
    <div className="contact-page">
      <Nav currentPage="contact" showPrimaryCta primaryCtaHref="/programs" primaryCtaLabel="Explore Programs" />

      <main>
        <PageHero
          title="Contact Us"
          subtitle="Schedule a tour, ask about enrollment, or connect with our team for program guidance."
          imageSrc={contactHero}
          ctaLabel="Explore Programs"
          ctaHref="/programs"
          minHeight="sm"
          overlayStrength="medium"
        />

        <section className="contact-layout section-shell">
          <article className="contact-info-card">
            <h2>Visit our center</h2>
            <p>
              We welcome families and caregivers who want to learn more about
              our environment, staff, and participant experience.
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
            <p>
              Email: <a href="mailto:info@willingworkers.org">info@willingworkers.org</a>
            </p>
          </article>

          <div className="contact-map-card" id="map">
            {apiKey ? (
              <LoadScript googleMapsApiKey={apiKey}>
                <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  center={center}
                  zoom={14}
                  options={mapOptions}
                >
                  <MarkerF
                    position={center}
                    label={{ text: "WW", color: "#146C94", fontWeight: "700" }}
                    onClick={() => setIsInfoOpen(true)}
                  />
                  {isInfoOpen && (
                    <InfoWindow
                      position={center}
                      onCloseClick={() => setIsInfoOpen(false)}
                      zIndex={12}
                    >
                      <div className="contact-map-card__popup">
                        <h3>Willing Workers</h3>
                        <Link href={directionUrl} target="_blank" rel="noreferrer">
                          4813 W. Washington Blvd., Los Angeles, CA 90016
                        </Link>
                      </div>
                    </InfoWindow>
                  )}
                </GoogleMap>
              </LoadScript>
            ) : (
              <div className="contact-map-card__fallback">
                <p>Map unavailable: missing `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`.</p>
              </div>
            )}
          </div>
        </section>

        <PrimaryCtaBar
          title="Interested in services first?"
          description="Review programs to see the areas of support available to participants."
          ctaLabel="Explore Programs"
          ctaHref="/programs"
        />
      </main>

      <Footer />
    </div>
  );
}
