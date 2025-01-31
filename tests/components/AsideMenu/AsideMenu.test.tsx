import { fireEvent, render, screen } from "@testing-library/react";
import { AsideMenu } from "../../../src/components/AsideMenu";
import { linksAsideMenu } from "../../../src/components/AsideMenu/links";
import { MemoryRouter } from "react-router-dom";

describe("Aside menu component", () => {
  //const links = linksAsideMenu;

  it("renders it", async () => {
    render(
      <MemoryRouter>
        <AsideMenu />
      </MemoryRouter>,
    );

    const linksContainer = await screen.findByTestId("links-container");

    expect(linksContainer).toBeInTheDocument();

    linksAsideMenu.map((link) => {
      expect(screen.queryByText(link?.name)).toBeInTheDocument();
    });
  });
});
