import { render, screen } from "@testing-library/react";
import { Header } from "../../../src/components/Header";
import { AuthProvider } from "../../../src/context/AuthContext";

describe("Header component", () => {
  const headerComponent = (
    <AuthProvider>
      <Header />
    </AuthProvider>
  );

  it("renders it", async () => {
    render(headerComponent);

    const header = await screen.findByTestId("header");

    expect(header).toBeInTheDocument();
  });
});
