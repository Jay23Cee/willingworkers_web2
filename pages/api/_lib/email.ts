import formidable from "formidable";

function getFieldValue(value: string | string[] | undefined): string {
  if (Array.isArray(value)) {
    return value[0] ?? "";
  }
  return value ?? "";
}

export function resolveJobPostId(fields: formidable.Fields): string {
  return (
    getFieldValue(fields.jobPostId as string | string[] | undefined) ||
    getFieldValue(fields.jobpost_id as string | string[] | undefined) ||
    getFieldValue(fields.id as string | string[] | undefined)
  );
}

export function buildEmailTemplate(input: {
  jobTitle: string;
  salary: string;
  location: string;
  name: string;
  email: string;
  phone: string;
  message: string;
}): string {
  return `Job Title: ${input.jobTitle}
Salary: ${input.salary}
Location: ${input.location}

Contact Information:
Name: ${input.name}
Email: ${input.email}
Phone Number: ${input.phone}

Cover Letter:
${input.message}

We kindly request you to review the application and consider the applicant for the position. If you require any additional information or have any questions, please feel free to reach out to the applicant directly using the contact information provided.

Thank you for your time and consideration.
Best regards,
Willing Workers`;
}
