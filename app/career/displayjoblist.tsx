"use client";

import React, { useState } from "react";
import { JobPosting } from "../components/jobpost";


export default function DisplayJobList(props: {
  jobListPostings: JobPosting[];
  applyToJobPosting: (isApplying: boolean, jobPosting: JobPosting) => void;
}) {
  const [jobListPostings, setJobListPostings] = useState<JobPosting[]>(
    props.jobListPostings as JobPosting[]
  );
  const [isLoading, setIsLoading] = useState(jobListPostings.length > 0);
  const [error, setError] = useState("");

  const handleApplyClick = (jobPosting: JobPosting) => {
    props.applyToJobPosting(true, jobPosting);
  };

  return (
    <div className="career-jobpost-container">
      {isLoading ? (
        jobListPostings.map((jobPosting: any, index: any) => (
          <div className="job-posting" key={index}>
            <h2>{jobPosting.title}</h2>
            <h4>{jobPosting.location}</h4>
            <p>Salary: {jobPosting.salary}</p>
            <p>Date: {jobPosting.date}</p>
            <button onClick={() => handleApplyClick(jobPosting)}>Apply</button>
            <hr />
            <h3>Description:</h3>
            <p>{jobPosting.description}</p>
            <h3>Qualifications:</h3>
            <p>{jobPosting.qualifications}</p>
            <h3>Contact:</h3>
            <p>Name: {jobPosting.contact.name}</p>
            <p>Email: {jobPosting.contact.email}</p>
            <p>Phone: {jobPosting.contact.phone}</p>
          </div>
        ))
      ) : (
        <div className="no-job-posting">
          <p>
            Sorry, no job postings are currently available. Please feel free
            to&nbsp;
            <a href="tel:123-456-7890">call</a>&nbsp;or&nbsp;
            <a href="mailto:jobs@example.com">email</a>&nbsp; us to inquire
            about future openings.
          </p>
        </div>
      )}
    </div>
  );
}
