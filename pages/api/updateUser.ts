import prisma from "../../prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { requireRole } from "./_lib/auth";

interface AddAdminRequest {
  name: string;
  email: string;
  role: string;
}

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

  const { name, email, role } = req.body as AddAdminRequest;

  if (!email || !name || !role) {
    return res
      .status(400)
      .json({ error: "Name, email, and role are required", code: "BAD_REQUEST" });
  }

  if (!["admin", "moderator"].includes(role)) {
    return res
      .status(400)
      .json({ error: "Invalid role", code: "BAD_REQUEST" });
  }

  const existingTarget = await prisma.allowUser.findUnique({ where: { email } });
  if (!existingTarget) {
    return res
      .status(404)
      .json({ error: "User not found in allow list", code: "NOT_FOUND" });
  }

  try {
    await prisma.$transaction([
      prisma.allowUser.update({
        where: { email },
        data: { role },
      }),
      prisma.user.updateMany({
        where: { email },
        data: { role },
      }),
    ]);

    res.status(201).json({
      message: "User updated successfully",
      user: { id: existingTarget.id, name, email, role },
    });
  } catch (error: any) {
    res
      .status(500)
      .json({ error: "Something went wrong", code: error?.code ?? "SERVER_ERROR" });
  }
}
