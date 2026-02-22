"use client";

import { JobPosting } from "../components/jobpost";

export default function DisplayJobList(props: {
  jobListPostings: JobPosting[];
  applyToJobPosting: (isApplying: boolean, jobPosting: JobPosting) => void;
}) {
  const hasPostings = props.jobListPostings.length > 0;

  return (
    <div className="career-jobpost-container">
      {hasPostings ? (
        props.jobListPostings.map((jobPosting) => (
          <article className="job-posting" key={jobPosting.id}>
            <header className="job-posting__header">
              <h2>{jobPosting.title}</h2>
              <p>
                {jobPosting.location} | {jobPosting.date}
              </p>
            </header>

            <p className="job-posting__salary">Salary: {jobPosting.salary}</p>
            <p>{jobPosting.description}</p>

            <h3>Qualifications</h3>
            <p>
              {jobPosting.qualifications && jobPosting.qualifications.length > 0
                ? jobPosting.qualifications.join(", ")
                : "High School diploma or equivalent"}
            </p>

            <h3>Hiring Contact</h3>
            <p>Name: {jobPosting.contact.name}</p>
            <p>
              Email: <a href={`mailto:${jobPosting.contact.email}`}>{jobPosting.contact.email}</a>
            </p>
            <p>Phone: {jobPosting.contact.phone}</p>

            <div className="job-posting__actions">
              <button
                type="button"
                className="job-posting__apply"
                onClick={() => props.applyToJobPosting(true, jobPosting)}
              >
                Apply Now
              </button>
            </div>
          </article>
        ))
      ) : (
        <article className="no-job-posting">
          <h2>No openings at the moment</h2>
          <p>
            We update this page frequently. Please check back soon or email
            <a href="mailto:info@willingworkers.org"> info@willingworkers.org</a>
            for upcoming opportunities.
          </p>
        </article>
      )}
    </div>
  );
}
