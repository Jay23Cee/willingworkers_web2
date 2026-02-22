"use client";

import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, Upload } from "antd";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { JobPosting } from "@/app/components/jobpost";

type ApplicationFormValues = {
  name: string;
  email: string;
  phone: string;
  coverLetter: string;
  resume: { originFileObj: File; name: string } | null;
};

const initialValues: ApplicationFormValues = {
  name: "",
  email: "",
  phone: "",
  coverLetter: "",
  resume: null,
};

export default function Application(props: {
  jobPosting: JobPosting;
  applyToJobPosting: (isApplying: boolean, jobPosting?: JobPosting) => void;
}) {
  const [values, setValues] = useState<ApplicationFormValues>(initialValues);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target;
    setValues((previousValues) => ({ ...previousValues, [name]: value }));
  }

  function handleFileChange(info: any) {
    const file = info.file;
    const isPdfOrDocx =
      file.type === "application/pdf" ||
      file.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    const isSizeUnderLimit = file.size / 1024 / 1024 < 5;

    if (!isPdfOrDocx) {
      info.onError(new Error("Only PDF or DOCX files are allowed."));
      return false;
    }

    if (!isSizeUnderLimit) {
      info.onError(new Error("File size must be less than 5MB."));
      return false;
    }

    setValues((previousValues) => ({
      ...previousValues,
      resume: { originFileObj: file.originFileObj, name: file.name },
    }));

    return false;
  }

  function handleBeforeUpload() {
    setValues((previousValues) => ({ ...previousValues, resume: null }));
    return true;
  }

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("phone", values.phone);
    formData.append("message", values.coverLetter);
    formData.append("jobPostId", props.jobPosting.id);

    if (values.resume) {
      formData.append("resume", values.resume.originFileObj);
    }

    try {
      await axios.post("/api/sendEmail", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Application submitted successfully.");
      props.applyToJobPosting(false);
      setValues(initialValues);
    } catch (error: any) {
      toast.error(error.message || "Unable to submit application.");
    }
  };

  return (
    <div className="application-shell" ref={sectionRef}>
      <Button
        className="application-back-button"
        onClick={() => props.applyToJobPosting(false)}
      >
        Back to Open Roles
      </Button>

      <div className="job-application-form">
        <div className="application-jobpost">
          <h3>{props.jobPosting.title}</h3>
          <h4>Location: {props.jobPosting.location}</h4>
          <h4>Salary: {props.jobPosting.salary}</h4>
          <p>{props.jobPosting.description}</p>
        </div>

        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="Full Name"
            name="name"
            rules={[{ required: true, message: "Please enter your name." }]}
          >
            <Input name="name" value={values.name} onChange={handleChange} />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please enter your email." }]}
          >
            <Input
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
            />
          </Form.Item>

          <Form.Item
            label="Phone"
            name="phone"
            rules={[{ required: true, message: "Please enter your phone number." }]}
          >
            <Input name="phone" type="tel" value={values.phone} onChange={handleChange} />
          </Form.Item>

          <Form.Item
            label="Cover Letter"
            name="coverLetter"
            rules={[{ required: true, message: "Please enter your cover letter." }]}
          >
            <Input.TextArea
              name="coverLetter"
              value={values.coverLetter}
              onChange={handleChange}
              rows={5}
            />
          </Form.Item>

          <Form.Item
            label="Resume"
            name="resume"
            rules={[{ required: true, message: "Please upload your resume." }]}
          >
            <Upload
              accept=".pdf,.docx"
              beforeUpload={handleBeforeUpload}
              onChange={handleFileChange}
              fileList={values.resume ? [values.resume as any] : []}
            >
              <Button icon={<UploadOutlined />}>Upload Resume</Button>
            </Upload>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" disabled={!values.resume}>
              Submit Application
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
