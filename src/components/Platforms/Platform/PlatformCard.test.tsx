import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { PlatformCard } from "./PlatformCard";
import { FALLBACK_INSPECTION_IMAGE } from "@/constants";

describe("PlatformCard", () => {
  it("renders the name and subHeading correctly", async () => {
    render(
      <PlatformCard
        name="Test Name"
        imageUrl="test.jpg"
        subHeading="Test SubHeading"
      />
    );

    const nameElement = screen.getByText("Test Name");
    expect(nameElement).toBeInTheDocument();

    const subHeadingElement = screen.getByText("Test SubHeading");
    expect(subHeadingElement).toBeInTheDocument();
  });

  it("renders the fallback image when imageUrl is not provided", async () => {
    const baseUrl = window.location.origin;
    const imgUrl = `${baseUrl}${FALLBACK_INSPECTION_IMAGE}`;
    render(
      <PlatformCard name="Test Name" imageUrl="" subHeading="Test SubHeading" />
    );

    const imgElement = screen.getByAltText("Test Name") as HTMLImageElement;
    expect(imgElement.src).toBe(imgUrl);
  });

  it("renders the correct alt text for the image", async () => {
    render(
      <PlatformCard
        name="Test Name"
        imageUrl="test.jpg"
        subHeading="Test SubHeading"
      />
    );

    const imgElement = screen.getByAltText("Test Name") as HTMLImageElement;
    const altText = imgElement.alt;
    expect(altText).toBe("Test Name");
    console.log(altText);
  });
});
