import prisma from "../../prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { requireRole } from "./_lib/auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ error: "Method not allowed", code: "METHOD_NOT_ALLOWED" });
  }

  const auth = await requireRole(req, res, ["admin", "moderator"]);
  if (!auth.ok) {
    return;
  }

  const {
    id,
    title,
    location,
    salary,
    date,
    description,
    qualifications,
    expirationDate,
    contact,
  } = req.body;

  if (
    !id ||
    !title ||
    !location ||
    !salary ||
    !date ||
    !description ||
    !qualifications ||
    !expirationDate ||
    !contact
  ) {
    return res
      .status(400)
      .json({ error: "All fields are required.", code: "BAD_REQUEST" });
  }

  try {
    const jobPosting = await prisma.jobPosting.update({
      where: { id },
      data: {
        title,
        location,
        salary,
        date,
        description,
        qualifications,
        expirationDate,
        contact: {
          update: {
            name: contact.name,
            email: contact.email,
            phone: contact.phone,
          },
        },
      },
    });

    res.status(200).json(jobPosting);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({
      error: "Internal server error",
      code: err?.code,
    });
  }
}
