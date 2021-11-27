import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import MenuIcon from "../components/layout/MenuIcon";

test("renders content", () => {
  const menu = {
    title: "Component testing is done with react-testing-library",
    id: "home",
    active: true,
  };

  const component = render(<MenuIcon {...menu} />);

  expect(component.container).toHaveTextContent(
    "Component testing is done with react-testing-library"
  );
});
