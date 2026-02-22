import { render, screen } from "@testing-library/react";
import { Footer } from "@/app/Footer";

describe("footer page", () => {
  it("should render properly", () => {
    render(<Footer />);
    expect(screen.getByText("OVS Willing Workers")).toBeInTheDocument();
  });
});
