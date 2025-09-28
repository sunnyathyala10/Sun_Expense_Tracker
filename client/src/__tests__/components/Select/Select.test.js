import React from "react";

import { cleanup, render, screen } from "@testing-library/react";
import Select from "../../../components/Select/Select";

describe("Select", () => {
  afterEach(cleanup);

  const testOptions = [
    { value: "en", label: "English" },
    { value: "es", label: "Spanish" },
  ];

  it("should return select component", function () {
    render(<Select options={testOptions}></Select>);
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("should have the mentioned placeholder", function () {
    render(
      <Select options={testOptions} placeholder="Test Placeholder"></Select>
    );
    expect(screen.getByText("Test Placeholder")).toBeInTheDocument();
  });
});
