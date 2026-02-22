import prisma from "../../prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { requireRole } from "./_lib/auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "DELETE") {
    return res
      .status(405)
      .json({ error: "Method not allowed", code: "METHOD_NOT_ALLOWED" });
  }

  const auth = await requireRole(req, res, ["admin", "moderator"]);
  if (!auth.ok) {
    return;
  }

  const { id } = req.body;

  if (!id) {
    return res
      .status(400)
      .json({ error: "ID is required for deletion.", code: "BAD_REQUEST" });
  }

  try {
    await prisma.jobPosting.delete({
      where: { id },
    });

    res.status(200).json({ message: "Job post deleted successfully." });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({
      error: "Internal server error",
      code: err?.code,
    });
  }
}
