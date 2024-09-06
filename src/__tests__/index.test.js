import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Home from "../app/page.tsx";

describe("home", () => {
  it("home btn test", () => {
    render(<Home />);

    const heading = screen.getByRole("button");

    expect(heading).toBeInTheDocument();
  });
});

describe("home", () => {
  it("home snapshot", () => {
    const { container } = render(<Home />);

    expect(container).toMatchSnapshot();
  });
});
