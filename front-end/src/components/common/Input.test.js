import { render } from "@testing-library/react";
import React from "react";
import Input from "./Input";

test("renders an input element", () => {
  const { container } = render(<Input />);
  const inputElement = container.querySelector("input");
  expect(inputElement).toBeInTheDocument();
});
