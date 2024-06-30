"use client";
import { useState, useEffect } from "react";
import { Button } from "antd";
import getJobPostings from "../../../app/api/getJobPostings";
import { JobPosting } from "../../../app/components/jobpost";
import { deleteJobPost } from "../../../app/api/deleteJobPosting";
import toast from "react-hot-toast";
import { setJobPosting } from "@/app/redux/reducer/jobPostingsSlice";
import { useDispatch, useSelector } from "react-redux";

export default function ListJobPosting(props: any) {
  const dispatch = useDispatch();
  const jobPostings = useSelector(
    (state: any) => state.jobPostings.jobPostings
  );
  const JobPostings_list = useSelector((state: any) => state.jobPostings);
  const [jobListPostings, setJobListPostings] = useState<JobPosting[]>(
    JobPostings_list.jobPostings.length > 0
      ? (JobPostings_list.jobPostings as JobPosting[])
      : []
  );
  const [isLoading, setIsLoading] = useState(
    JobPostings_list.jobPostings.length > 0
  );

  useEffect(() => {
    let isMounted = true;
    async function fetchData() {
      const data = await getJobPostings();
      if (data && isMounted) {
        dispatch(setJobPosting(data as JobPosting[]));
        setIsLoading(false);

        setJobListPostings(data as JobPosting[]);
      }
    }

    if (!JobPostings_list.jobPostings.length) {
      fetchData();
    }

    return () => {
      isMounted = false;
    };
  }, []);

  function handleDelete(id: string) {
    try {
      deleteJobPost(id);
      dispatch(
        setJobPosting(
          jobPostings.filter((jobPosting: any) => jobPosting.id !== id)
        )
      );
      toast.success("Job post deleted");

      setTimeout(() => {
        window.alert("The page will now refresh");
        window.location.reload();
      }, 2000); // 2000 milliseconds = 2 seconds
    } catch (error: any) {
      console.error(error.message);
      toast.error("Error deleting job post");
    }
  }

  return (
    <div className="list-jobpost-container">
      {jobListPostings.length > 0 ? (
        jobListPostings.map((jobPosting, index) => (
          <div className="list-job-posting" key={index}>
            <h2>{jobPosting.title}</h2>
            <h4>{jobPosting.location}</h4>
            <p>Salary: {jobPosting.salary}</p>
            <p>Date: {jobPosting.date}</p>
            <Button
              onClick={() => props.onClick("edit-job-posting", jobPosting)}
            >
              Edit
            </Button>
            <Button
              style={{ background: "red", color: "white" }}
              onClick={() => handleDelete(jobPosting.id)}
            >
              Delete
            </Button>
            <hr />
            <h3>Description:</h3>
            <p>{jobPosting.description}</p>
            <h3>Qualifications:</h3>
            <p>
              {jobPosting.qualifications && jobPosting.qualifications.length > 0
                ? jobPosting.qualifications.join(", ")
                : "High School"}
            </p>

            <h3>Contact:</h3>
            <p>Name: {jobPosting.contact.name}</p>
            <p>Email: {jobPosting.contact.email}</p>

            <p>Phone: {jobPosting.contact.phone}</p>
          </div>
        ))
      ) : (
        <div className="no-job-posting">
          <p>No job postings are currently available</p>
        </div>
      )}
    </div>
  );
}
