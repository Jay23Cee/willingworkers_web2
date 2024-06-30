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
            <p style={{ fontSize: '18px', fontWeight: 'bold', color: 'red', textAlign: 'center', padding: '10px' }}>
              To apply, please send your application to the following email: <a href={`mailto:${jobPosting.contact.email}`} style={{ color: 'blue' }}>{jobPosting.contact.email}</a>
            </p>
            <hr />
            <h3>Description:</h3>
            <p>{jobPosting.description}</p>
            <h3>Qualifications:</h3>
            <p>{jobPosting.qualifications || "No specific qualifications required. Please check the job description for more details."}</p>
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
