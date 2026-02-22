"use client";
import { getSession } from "next-auth/react";
import { User } from "../components/user";

function getBypassUser(): User {
  return {
    id: "dev-admin-id",
    name: process.env.NEXT_PUBLIC_DEV_AUTH_BYPASS_NAME ?? "Dev Admin",
    email:
      process.env.NEXT_PUBLIC_DEV_AUTH_BYPASS_EMAIL ?? "dev-admin@local.test",
    role: process.env.NEXT_PUBLIC_DEV_AUTH_BYPASS_ROLE ?? "admin",
    image: "",
  };
}

export default async function useAuthRedux(currentUser?: Partial<User>) {
  if (process.env.NEXT_PUBLIC_DEV_AUTH_BYPASS === "true") {
    return getBypassUser();
  }

  if (currentUser?.email && currentUser?.role) {
    return currentUser as User;
  }

  const session = await getSession();
  if (!session?.user?.email) {
    return false;
  }

  return session.user as User;
}
