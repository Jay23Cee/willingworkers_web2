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
    const result = await prisma.jobPosting.create({
      data: {
        title,
        location,
        salary,
        date,
        description,
        qualifications,
        expirationDate,
        contact: {
          create: {
            name: contact.name,
            email: contact.email,
            phone: contact.phone,
          },
        },
      },
    });
    res.status(200).json(result);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({
      error: "Internal server error",
      code: err?.code,
    });
  }
}
