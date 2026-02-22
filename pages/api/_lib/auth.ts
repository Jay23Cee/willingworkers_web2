import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import prisma from "@/prisma/client";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

type Role = "admin" | "moderator";

type AuthResult =
  | { ok: true; user: { id: string; email: string; role: Role } }
  | { ok: false };

export async function requireRole(
  req: NextApiRequest,
  res: NextApiResponse,
  allowedRoles: Role[]
): Promise<AuthResult> {
  const bypassEnabled =
    process.env.NODE_ENV !== "production" &&
    process.env.DEV_AUTH_BYPASS === "true";

  if (bypassEnabled) {
    const bypassRole = (process.env.DEV_AUTH_BYPASS_ROLE ?? "admin") as Role;
    if (!allowedRoles.includes(bypassRole)) {
      res.status(403).json({ error: "Forbidden", code: "FORBIDDEN" });
      return { ok: false };
    }

    return {
      ok: true,
      user: {
        id: process.env.DEV_AUTH_BYPASS_ID ?? "dev-admin-id",
        email: process.env.DEV_AUTH_BYPASS_EMAIL ?? "dev-admin@local.test",
        role: bypassRole,
      },
    };
  }

  const session = await getServerSession(req, res, authOptions);

  if (!session?.user?.email) {
    res.status(401).json({ error: "Unauthorized", code: "UNAUTHORIZED" });
    return { ok: false };
  }

  let dbUser;
  try {
    dbUser = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true, email: true, role: true },
    });
  } catch (error) {
    console.error("Authorization lookup failed:", error);
    res.status(500).json({ error: "Internal server error", code: "SERVER_ERROR" });
    return { ok: false };
  }

  const role = dbUser?.role as Role | null;
  if (!dbUser || !role || !allowedRoles.includes(role)) {
    res.status(403).json({ error: "Forbidden", code: "FORBIDDEN" });
    return { ok: false };
  }

  return { ok: true, user: { id: dbUser.id, email: dbUser.email, role } };
}
