import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

export default async function AdminSession() {
  const bypassEnabled =
    process.env.NODE_ENV !== "production" &&
    process.env.DEV_AUTH_BYPASS === "true";

  if (bypassEnabled) {
    return {
      user: {
        id: process.env.DEV_AUTH_BYPASS_ID ?? "dev-admin-id",
        name: process.env.DEV_AUTH_BYPASS_NAME ?? "Dev Admin",
        email: process.env.DEV_AUTH_BYPASS_EMAIL ?? "dev-admin@local.test",
        role: process.env.DEV_AUTH_BYPASS_ROLE ?? "admin",
        image: "",
      },
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(),
    };
  }

  const session = await getServerSession(authOptions);

  if (!session) {
    return null;
  }

  return session;
}
