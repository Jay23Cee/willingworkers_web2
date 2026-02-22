import prisma from "../../prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from "uuid";
import { requireRole } from "./_lib/auth";

interface AddAdminRequest {
  id: string;
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
  const id = uuidv4();

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

  const existingUser = await prisma.allowUser.findUnique({ where: { email } });
  if (existingUser) {
    return res
      .status(409)
      .json({ error: "User already exists", code: "CONFLICT" });
  }

  const newUser = await prisma.allowUser.create({
    data: {
      id,
      name,
      email,
      role,
    },
  });

  res
    .status(201)
    .json({ message: "Admin user created successfully", user: newUser });
}
