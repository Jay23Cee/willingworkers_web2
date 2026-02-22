"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import careerHero from "../../public/assets/professional/career/hero.webp";
import getJobPostings from "../api/getJobPostings";
import PageHero from "../components/PageHero";
import { JobPosting } from "../components/jobpost";
import PrimaryCtaBar from "../components/PrimaryCtaBar";
import { setJobPosting } from "../redux/reducer/jobPostingsSlice";
import { Footer } from "../Footer";
import Nav from "../Nav";
import Application from "./[...career]/application";
import DisplayJobList from "./displayjoblist";

const directionUrl =
  "https://www.google.com/maps/dir/?api=1&destination=" +
  encodeURI("4813 W. Washington Blvd., Los Angeles, CA 90016");

export default function CareerList() {
  const dispatch = useDispatch();
  const storedJobPostings = useSelector(
    (state: any) => state.jobPostings.jobPostings as JobPosting[]
  );

  const [jobListPostings, setJobListPostings] = useState<JobPosting[]>(
    storedJobPostings.length > 0 ? storedJobPostings : []
  );
  const [isLoading, setIsLoading] = useState(storedJobPostings.length === 0);
  const [isApplying, setIsApplying] = useState(false);
  const [selectedJobPosting, setSelectedJobPosting] = useState<JobPosting | null>(null);
  const [loadingText, setLoadingText] = useState("Loading");

  useEffect(() => {
    if (storedJobPostings.length > 0) {
      setJobListPostings(storedJobPostings);
      setIsLoading(false);
    }
  }, [storedJobPostings]);

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      try {
        const data = await getJobPostings();
        if (data && isMounted) {
          const postings = data as JobPosting[];
          setJobListPostings(postings);
          dispatch(setJobPosting(postings));
        }
      } catch (error) {
        console.error("Error fetching job postings", error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    if (storedJobPostings.length === 0) {
      fetchData();
    }

    return () => {
      isMounted = false;
    };
  }, [dispatch, storedJobPostings.length]);

  useEffect(() => {
    if (!isLoading) {
      return;
    }

    const loadingTexts = ["Loading", "Loading .", "Loading ..", "Loading ..."];
    let index = 0;
    const interval = window.setInterval(() => {
      index = (index + 1) % loadingTexts.length;
      setLoadingText(loadingTexts[index]);
    }, 500);

    return () => window.clearInterval(interval);
  }, [isLoading]);

  const applyToJobPosting = (applying: boolean, jobPosting?: JobPosting) => {
    if (applying && jobPosting) {
      setSelectedJobPosting(jobPosting);
      setIsApplying(true);
      return;
    }

    setIsApplying(false);
    setSelectedJobPosting(null);
  };

  return (
    <div className="career-page">
      <Nav currentPage="career" showPrimaryCta primaryCtaHref="/programs" primaryCtaLabel="Explore Programs" />

      <main>
        <PageHero
          title="Careers"
          subtitle="Join a mission-driven team committed to respectful, high-quality support for adults with developmental disabilities."
          imageSrc={careerHero}
          ctaLabel="Explore Programs"
          ctaHref="/programs"
          minHeight="sm"
          overlayStrength="medium"
        />

        <section className="career-intro section-shell">
          <article>
            <h2>Build your career with purpose</h2>
            <p>
              We are always looking for dependable and compassionate team
              members who want to make a daily difference.
            </p>
            <p>
              Learn more in person at our center or send your application for an
              open role below.
            </p>
          </article>

          <article className="career-intro__details">
            <h3>Location and Hours</h3>
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
        </section>

        <section className="career-jobs section-shell">
          {isLoading ? (
            <div className="loading-text">{loadingText}</div>
          ) : isApplying && selectedJobPosting ? (
            <Application
              jobPosting={selectedJobPosting}
              applyToJobPosting={applyToJobPosting}
            />
          ) : (
            <DisplayJobList
              jobListPostings={jobListPostings}
              applyToJobPosting={applyToJobPosting}
            />
          )}
        </section>

        <PrimaryCtaBar
          title="Need help deciding if a role is the right fit?"
          description="Reach out and our team can walk you through responsibilities and hiring steps."
          ctaLabel="Contact Us"
          ctaHref="/contact"
        />
      </main>

      <Footer />
    </div>
  );
}
