"use client";

import Image from "next/image";
import fb from "../public/assets/footer/fb.png";
import instagram from "../public/assets/footer/insta.png";

const directionUrl =
  "https://www.google.com/maps/dir/?api=1&destination=" +
  encodeURI("4813 W. Washington Blvd., Los Angeles, CA 90016");

export const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner section-shell">
        <div className="site-footer__brand">
          <h2>OVS Willing Workers</h2>
          <p>
            We support adults with intellectual and developmental disabilities
            through practical training, community engagement, and consistent
            care.
          </p>
        </div>

        <div className="site-footer__details">
          <h3>Visit or Contact</h3>
          <p>
            <a href={directionUrl} target="_blank" rel="noreferrer">
              4813 W. Washington Blvd., Los Angeles, CA 90016
            </a>
          </p>
          <p>Monday - Friday, 8:00am - 3:00pm</p>
          <p>
            Phone: <a href="tel:3239375950">(323) 937-5950</a>
          </p>
          <p>
            Email: <a href="mailto:info@willingworkers.org">info@willingworkers.org</a>
          </p>

          <div className="site-footer__social">
            <a
              href="https://www.facebook.com/profile.php?id=100087648068663"
              target="_blank"
              rel="noreferrer"
              aria-label="Willing Workers on Facebook"
            >
              <Image src={fb} alt="" width={28} height={28} />
            </a>
            <a
              href="https://www.instagram.com/ovswillingworkers"
              target="_blank"
              rel="noreferrer"
              aria-label="Willing Workers on Instagram"
            >
              <Image src={instagram} alt="" width={28} height={28} />
            </a>
          </div>
        </div>
      </div>

      <div className="site-footer__copyright">
        <p>{new Date().getFullYear()} Willing Workers. All rights reserved.</p>
      </div>
    </footer>
  );
};
