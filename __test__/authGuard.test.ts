import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import prisma from "@/prisma/client";
import { requireRole } from "@/pages/api/_lib/auth";

jest.mock("next-auth/next", () => ({
  getServerSession: jest.fn(),
}));

jest.mock("@/prisma/client", () => ({
  __esModule: true,
  default: {
    user: {
      findUnique: jest.fn(),
    },
  },
}));

jest.mock("@/pages/api/auth/[...nextauth]", () => ({
  authOptions: {},
}));

function createMockResponse() {
  const res = {} as NextApiResponse;
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
}

describe("requireRole", () => {
  const mockedGetServerSession = getServerSession as jest.Mock;
  const mockedFindUnique = (prisma as any).user.findUnique as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns 401 when session is missing", async () => {
    mockedGetServerSession.mockResolvedValue(null);

    const req = {} as NextApiRequest;
    const res = createMockResponse();

    const result = await requireRole(req, res, ["admin"]);

    expect(result.ok).toBe(false);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      error: "Unauthorized",
      code: "UNAUTHORIZED",
    });
  });

  it("returns 403 when user role is not allowed", async () => {
    mockedGetServerSession.mockResolvedValue({
      user: { email: "user@example.com" },
    });
    mockedFindUnique.mockResolvedValue({
      id: "u1",
      email: "user@example.com",
      role: "moderator",
    });

    const req = {} as NextApiRequest;
    const res = createMockResponse();

    const result = await requireRole(req, res, ["admin"]);

    expect(result.ok).toBe(false);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({
      error: "Forbidden",
      code: "FORBIDDEN",
    });
  });

  it("returns user when role is allowed", async () => {
    mockedGetServerSession.mockResolvedValue({
      user: { email: "admin@example.com" },
    });
    mockedFindUnique.mockResolvedValue({
      id: "a1",
      email: "admin@example.com",
      role: "admin",
    });

    const req = {} as NextApiRequest;
    const res = createMockResponse();

    const result = await requireRole(req, res, ["admin"]);

    expect(result).toEqual({
      ok: true,
      user: {
        id: "a1",
        email: "admin@example.com",
        role: "admin",
      },
    });
  });
});
