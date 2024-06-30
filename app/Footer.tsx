"use client";
import "./globals.css";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import fb from "../public/assets/footer/fb.png";
import instagram from "../public/assets/footer/insta.png";

export const Footer = () => {
  return (
    <section className="footer">
      <div className="Footer">
        <div className="container text-center text-md-start mt-5">
          <div className="row mt-3">
            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
              <h1 className="text-uppercase fw-bold mb-4">
                <i className="me-3 fas fa-gem" />
                OVS Willing Workers
              </h1>
            </div>

            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
              <h3 className="text-uppercase fw-bold mb-4">
                Do you have Questions? Call or visit us.
              </h3>

              <p>
                <i className="me-3 fas fa-phone" /> Phone: (323) 937-5950{" "}
                <br></br>
                <i className="me-3 fas fa-fax" /> Fax: + 01 234 567 89
              </p>

              <p>
                <i className="me-2 fas fa-home" />
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURI(
                    "4813 W. Washington Blvd., Los Angeles, Los Angeles 90016"
                  )}`}
                  target="_blank"
                >
                  4813 W. Washington Blvd.<br></br>
                  Los Angeles, Los Angeles 90016
                </a>
              </p>
              <p>
                <i className="me-4 fas fa-envelope" />
                info@willingworkers.com
              </p>

              <div className="social-icons">
                <a href="https://www.facebook.com/profile.php?id=100087648068663">
                  <Image
                    src={fb}
                    alt="fb logo"
                    width={60}
                    height={60}
                  />
                </a>
                <a href="https://www.instagram.com/ovswillingworkers?fbclid=IwAR3UzOrEDw1CSp5CQgLaNnw4L3BZIo0d6R1fAVx6zNjtd8UJalzIuVAB_7A_aem_AUF2YT7kIZ1j-D3u8vCY56v1YcSatNZx_JqXhSoScmX1ROF_0iMCR67L5b30GjngChuHTt8hOuXeu00WV7NR3S9k">
                  <Image
                    src={instagram}
                    alt="insta logo"
                    width={60}
                    height={60}
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div
          className="text-center p-4"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
        >
          © {new Date().getFullYear()} Willing Workers. All rights reserved.
        </div>
      </div>
    </section>
  );
};
