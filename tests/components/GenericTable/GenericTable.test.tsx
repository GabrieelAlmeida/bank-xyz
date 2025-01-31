import { render, screen } from "@testing-library/react";
import { GenericTable } from "../../../src/components/GenericTable";
import { DataGridProps } from "@mui/x-data-grid";

describe("GenericTable component", () => {
  const defaultProps: DataGridProps = {
    rows: [],
    columns: [],
    loading: false,
  };

  it("renders correctly", () => {
    render(<GenericTable {...defaultProps} />);
    expect(screen.getByTestId("genericTable")).toBeInTheDocument();
  });

  it("displays no data overlay when there are no rows", () => {
    render(<GenericTable {...defaultProps} />);
    expect(
      screen.getByText("Sorry, your search retrieved no results."),
    ).toBeInTheDocument();
  });

  it("displays loading state", () => {
    render(<GenericTable {...defaultProps} loading={true} />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("applies custom styles", () => {
    render(<GenericTable {...defaultProps} />);
    const table = screen.getByTestId("genericTable");
    expect(table).toHaveStyle({ minHeight: "500px", width: "100%" });
  });

  it("displays pagination controls", () => {
    render(<GenericTable {...defaultProps} />);
    expect(screen.getByLabelText("Items per page:")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /first page/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /last page/i }),
    ).toBeInTheDocument();
  });
});
