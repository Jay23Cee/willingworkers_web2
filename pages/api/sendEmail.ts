import sgMail from "@sendgrid/mail";
import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import { File } from "formidable";
import prisma from "@/prisma/client";
import { buildEmailTemplate, resolveJobPostId } from "./_lib/email";

export const config = {
  api: {
    bodyParser: false,
  },
};

function isFile(obj: any): obj is File {
  return "filepath" in obj && "originalFilename" in obj && "mimetype" in obj;
}

export default async function sendEmailHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).send("Method Not Allowed");
    return;
  }

  const sgEmail = process.env.SENDGRID_API_EMAIL as string;
  if (!sgEmail || !process.env.SENDGRID_API_KEY) {
    res.status(500).send("Email service not configured.");
    return;
  }
  sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

  const form = new formidable.IncomingForm();

  try {
    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error("Error parsing form:", err);
        res.status(500).send("Error sending message.");
        return;
      }

      const name = Array.isArray(fields.name) ? fields.name[0] ?? "" : fields.name ?? "";
      const email = Array.isArray(fields.email) ? fields.email[0] ?? "" : fields.email ?? "";
      const message =
        Array.isArray(fields.message) ? fields.message[0] ?? "" : fields.message ?? "";
      const phone = Array.isArray(fields.phone) ? fields.phone[0] ?? "" : fields.phone ?? "";
      const jobPostId = resolveJobPostId(fields);
      const jobpost = await getJobpost(jobPostId);

      if (!jobpost) {
        res.status(404).send("Job posting not found.");
        return;
      }

      const resumeFile = files.resume as File;
      if (!isFile(resumeFile)) {
        console.error("Invalid resume file:", resumeFile);
        res.status(400).send("Invalid resume file.");
        return;
      }

      const fs = require("fs");
      const resumeContent = fs
        .readFileSync(resumeFile.filepath)
        .toString("base64");

      const emailTemplate = buildEmailTemplate({
        jobTitle: jobpost.title,
        salary: jobpost.salary,
        location: jobpost.location,
        name,
        email,
        phone,
        message,
      });

      const msg = {
        to: jobpost.contact?.email || sgEmail,
        from: sgEmail,
        subject: `Job Application for ${jobpost.title}`,
        text: emailTemplate,
        attachments: [
          {
            content: resumeContent,
            filename: resumeFile.originalFilename as string,
            type: resumeFile.mimetype as string,
            disposition: "attachment" as string,
          },
        ],
      };

      try {
        await sgMail.send(msg);
        res.status(200).send("Message sent successfully.");
      } catch (error) {
        console.error(error);
        res.status(500).send("Error sending message in sendgrid.");
      }
    });
  } catch (err) {
    console.error("Error parsing form:", err);
    res.status(500).send("Error sending message.");
    return;
  }
};

const getJobpost = async (id: string) => {
  const jobPost = await prisma.jobPosting.findFirst({
    where: {
      id,
    },
    include: {
      contact: true,
    },
  });

  return jobPost;
}
