import { buildEmailTemplate, resolveJobPostId } from "@/pages/api/_lib/email";

describe("email utils", () => {
  it("resolves job id from preferred key", () => {
    const fields = {
      jobPostId: "job-1",
      jobpost_id: "job-2",
      id: "job-3",
    } as any;

    expect(resolveJobPostId(fields)).toBe("job-1");
  });

  it("falls back to legacy keys when needed", () => {
    expect(resolveJobPostId({ jobpost_id: "legacy-1" } as any)).toBe("legacy-1");
    expect(resolveJobPostId({ id: "legacy-2" } as any)).toBe("legacy-2");
  });

  it("builds a complete email template", () => {
    const output = buildEmailTemplate({
      jobTitle: "Behavior Coach",
      salary: "25.00",
      location: "Los Angeles",
      name: "Test User",
      email: "test@example.com",
      phone: "555-555-5555",
      message: "I am interested in this role.",
    });

    expect(output).toContain("Job Title: Behavior Coach");
    expect(output).toContain("Salary: 25.00");
    expect(output).toContain("Location: Los Angeles");
    expect(output).toContain("Name: Test User");
    expect(output).toContain("Email: test@example.com");
    expect(output).toContain("Phone Number: 555-555-5555");
    expect(output).toContain("I am interested in this role.");
  });
});
