import { render, screen } from "@testing-library/react";
import NoData from "../../../src/components/NoData";

describe("NoData component", () => {
  it("renders it when don't have data", () => {
    render(<NoData empty />);

    expect(screen.queryByText("Sorry, your search retrieved no results."));
  });
  it("renders it when data is loading", () => {
    render(<NoData empty={false} />);

    expect(screen.queryByText("Loading..."));
  });
});
