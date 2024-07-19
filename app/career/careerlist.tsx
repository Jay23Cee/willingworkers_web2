"use client";

import { useEffect, useState } from "react";
import "../../styles/global.scss";
import { Footer } from "../Footer";
import { JobPosting } from "../components/jobpost";
import Nav from "../Nav";
import getJobPostings from "../api/getJobPostings";
import { useDispatch, useSelector } from "react-redux";
import { setJobPosting } from "../redux/reducer/jobPostingsSlice";
import { AppState } from "../redux/store/store";
import DisplayJobList from "./displayjoblist";
import Application from "./[...career]/application";

function CareerList() {
  const dispatch = useDispatch();

  const JobPostings_list = useSelector((state: any) => {
    return state.jobPostings.jobPostings;
  });

  const [jobListPostings, setJobListPostings] = useState<JobPosting[]>(
    JobPostings_list.length > 0 ? (JobPostings_list as JobPosting[]) : []
  );
  const [isLoading, setIsLoading] = useState(jobListPostings.length === 0); // Initialize based on jobListPostings
  const [isApplying, setIsApplying] = useState(false);
  const [selectedJobPosting, setSelectedJobPosting] = useState<JobPosting>();

  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    // Set isLoading to true initially
    setIsLoading(true);
    async function fetchData() {
      try {
        const data = await getJobPostings();
        if (data && isMounted) {
          setJobListPostings(data as JobPosting[]);
          dispatch(setJobPosting(data as JobPosting[]));
        }
      } catch (error) {
        setError('Error fetching job postings');
      } finally {
        // Set isLoading to false once data is fetched
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    if (!jobListPostings.length) {
      fetchData();
    } else {
      setIsLoading(false); // If there are job postings, no need to fetch and set loading to false
    }

    return () => {
      isMounted = false;
    };
  }, [jobListPostings, dispatch]);

  const applyToJobPosting = (isApplying: boolean, jobPosting?: JobPosting) => {
    if (isApplying) {
      setIsApplying(isApplying);
      setSelectedJobPosting(jobPosting);
    }
    setIsApplying(isApplying);
  };

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string;

  return (
    <>
      <Nav image={""} banner={""} />
      <div className="career">
        <div className="career-container-banner mt-4 p-5 bg-primary text-white">
          <h1>Career</h1>
          <p></p>
        </div>

        <div className="career-text">
          <h1>Join our team today</h1>
          <h5>
            At Willing Workers, we are always looking for dedicated individuals
            to join our team. We offer competitive salaries, comprehensive
            benefits, and opportunities for growth and advancement. Come visit
            us for a tour to see what we're all about and start your career with
            us today!
          </h5>
          <h3>
            {" "}
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURI(
                "4813 W. Washington Blvd., Los Angeles, Los Angeles 90016"
              )}`}
              target="_blank"
            >
              4813 W. Washington Blvd.<br></br>
              Los Angeles, CA 90016
            </a>
          </h3>
          <h3>Monday - Friday 8:00am - 3:00pm</h3>
          <h3>
            Phone:<a href="tel:323-729-9898">323-729-9898</a>
          </h3>
          <h3>Email: info@willingworkers.org</h3>
        </div>
        <div className="Career-holder">
          {isLoading ? (
            <div>Loading...</div>
          ) : isApplying ? (
            <Application
              jobPosting={selectedJobPosting as JobPosting}
              applyToJobPosting={applyToJobPosting}
            />
          ) : (
            <DisplayJobList
              jobListPostings={jobListPostings}
              applyToJobPosting={applyToJobPosting}
            />
          )}
        </div>
        <Footer />
      </div>
    </>
  );
}

export default CareerList;
