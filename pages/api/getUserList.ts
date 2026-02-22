import prisma from "../../prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { requireRole } from "./_lib/auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res
      .status(405)
      .json({ error: "Method not allowed", code: "METHOD_NOT_ALLOWED" });
  }

  const auth = await requireRole(req, res, ["admin"]);
  if (!auth.ok) {
    return;
  }

  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        role: true,
      },
    });
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error", code: "SERVER_ERROR" });
  }
}
