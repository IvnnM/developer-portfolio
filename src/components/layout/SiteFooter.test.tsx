import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import SiteFooter from "./SiteFooter";

describe("SiteFooter", () => {
  it("renders a content information landmark", () => {
    render(<SiteFooter />);

    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });
});
