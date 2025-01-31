import { render, screen } from "@testing-library/react";
import { Logo } from "../../../src/components/Logo/index";
describe("Logo component", () => {
  it("renders it", async () => {
    render(<Logo />);

    const logo = await screen.findByTestId("logo-app");

    expect(logo).toBeInTheDocument();
    expect(logo.querySelector("h1")).toHaveTextContent("Bank XYZ");
  });
});
