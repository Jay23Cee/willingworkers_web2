import axios from "axios";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

interface JobPosting {
  title: string;
  location: string;
  salary: string;
  date: string;
  expirationDate?: string;
  description: string;
  qualifications: string[];
  contact: {
    name: string;
    email: string;
    phone: string;
  };
}

interface EditJobPostProps {
  prop: JobPosting;
  setSelectedOption: (selectedOption: string) => void;
}

export default function JobPostingEditor({
  prop,
  setSelectedOption,
}: EditJobPostProps) {
  const textareaDescription = useRef<HTMLTextAreaElement | null>(null);
  const now = new Date();
  const expirationDate = new Date(now);
  expirationDate.setMonth(expirationDate.getMonth() + 1); // add 1 month

  useEffect(() => {
    if (textareaDescription.current) {
      textareaDescription.current.style.height = "auto";
      textareaDescription.current.style.height = `${textareaDescription.current.scrollHeight}px`;
    }
  }, [textareaDescription.current?.value]);

  const [jobPosting, setJobPosting] = useState<JobPosting>(() => ({
    ...prop,
    date: prop.date || now.toISOString().substr(0, 10),
    expirationDate: prop.expirationDate || expirationDate.toISOString().substr(0, 10),
    qualifications: prop.qualifications || [],
    contact: prop.contact || {
      name: "",
      email: "",
      phone: "",
    },
  }));

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = event.target;

    if (name === "description") {
      if (value.length > 500) {
        return; // Do nothing if the description exceeds 500 characters
      }
      setJobPosting((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else if (name === "name" || name === "email" || name === "phone") {
      setJobPosting((prevState) => ({
        ...prevState,
        contact: {
          ...prevState.contact,
          [name]: value,
        },
      }));
    } else {
      console.log(name,"||\n", value)
      setJobPosting((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleQualificationsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, checked } = event.target;
    if (checked) {
      setJobPosting((prevState) => ({
        ...prevState,
        qualifications: [...prevState.qualifications, name],
      }));
    } else {
      setJobPosting((prevState) => ({
        ...prevState,
        qualifications: prevState.qualifications.filter((q) => q !== name),
      }));
    }
  };

  const handleSalaryChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { value } = event.target;
    const formattedSalary = value.replace(/[^0-9.]/g, ""); // Remove non-numeric characters
    setJobPosting((prevState) => ({
      ...prevState,
      salary: formattedSalary,
    }));
  };

  const handleSalaryBlur = (event: React.FocusEvent<HTMLInputElement>): void => {
    const { value } = event.target;
    const formattedSalary = value ? parseFloat(value).toFixed(2) : "";
    setJobPosting((prevState) => ({
      ...prevState,
      salary: formattedSalary,
    }));
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    try {
      const response = await axios.post("/api/editPost", jobPosting);
      if (response.status === 200) {
        toast.success("Edit has been saved");
    
        setTimeout(() => {
            window.alert("The page will now refresh");
            window.location.reload();
        }, 2000); // 2000 milliseconds = 2 seconds

      } else {
        toast.error("Error saving");
        throw new Error("Error creating job post");
      }
    } catch (error) {
      toast.error("Error saving");
      console.error(error);
    }
  };

  return (
    <>
      <div className="form-container">
        <div className="form-container-content">
          <h2>Edit Job Post</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                id="title"
                name="title"
                value={jobPosting.title}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="location">Location:</label>
              <input
                type="text"
                id="location"
                name="location"
                value={jobPosting.location}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="salary">Salary:</label>
              <input
                type="text"
                id="salary"
                name="salary"
                value={jobPosting.salary}
                onChange={handleSalaryChange}
                onBlur={handleSalaryBlur}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="date">Date:</label>
              <input
                type="date"
                id="date"
                name="date"
                value={jobPosting.date}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="expirationDate">Expiration Date:</label>
              <input
                type="date"
                id="expirationDate"
                name="expirationDate"
                value={jobPosting.expirationDate || ""}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group job-description">
              <label htmlFor="description">Description:</label>
              <textarea
                ref={textareaDescription}
                id="description"
                name="description"
                className="description"
                value={jobPosting.description}
                onChange={handleInputChange}
                required
                rows={4}
                maxLength={500} // Limit input to 500 characters
              />
              <p>{jobPosting.description.length}/500 characters</p>
            </div>

            <div className="form-group qualification">
              <label>Qualifications:</label>
              <ul>
                <li>
                  <input
                    type="checkbox"
                    id="high_school_diploma"
                    name="High School Diploma"
                    checked={jobPosting.qualifications.includes(
                      "High School Diploma "
                    )}
                    onChange={handleQualificationsChange}
                  />
                  <label htmlFor="high_school_diploma">
                    High School Diploma
                  </label>
                </li>
                <li>
                  <input
                    type="checkbox"
                    id="some_college"
                    name="Some College"
                    checked={jobPosting.qualifications.includes("Some College ")}
                    onChange={handleQualificationsChange}
                  />
                  <label htmlFor="some_college">Some College</label>
                </li>
                <li>
                  <input
                    type="checkbox"
                    id="bachelor_degree"
                    name="Bachelor's Degree"
                    checked={jobPosting.qualifications.includes(
                      "Bachelor's Degree "
                    )}
                    onChange={handleQualificationsChange}
                  />
                  <label htmlFor="bachelor_degree">Bachelor's Degree</label>
                </li>
              </ul>
            </div>

            <div className="form-group">
              <label htmlFor="name">Contact Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={jobPosting.contact.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Contact Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={jobPosting.contact.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Contact Phone:</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={jobPosting.contact.phone}
                onChange={handleInputChange}
                required
              />
            </div>

            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
}
