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

  const auth = await requireRole(req, res, ["admin"]);
  if (!auth.ok) {
    return;
  }

  const id = req.body?.data?.id;

  if (!id) {
    return res
      .status(400)
      .json({ error: "ID is required for deletion.", code: "BAD_REQUEST" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return res
        .status(404)
        .json({ error: "User not found.", code: "NOT_FOUND" });
    }

    await prisma.user.delete({
      where: { id },
    });

    const email = user.email;
    await prisma.allowUser.deleteMany({
      where: { email },
    });

    res
      .status(200)
      .json({ message: "User and allowUser record deleted successfully.", user });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({
      error: "Internal server error",
      code: err?.code,
    });
  }
}
