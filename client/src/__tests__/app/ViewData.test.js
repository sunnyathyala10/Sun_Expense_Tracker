import React from "react";

import { cleanup, render, screen } from "@testing-library/react";
import ViewData from "../../app/ViewData";

jest.mock("react-i18next", () => ({
  useTranslation: () => {
    return {
      t: (str) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
}));

describe("ViewData", () => {
  afterEach(cleanup);

  const testSankeyData = [
    ["From", "To", "Amount"],
    ["Income", "Expense", 1000],
    ["Salary", "Income", 5000],
    ["Expense", "Electric Bill", 1000],
  ];

  it("should return table containing the data", function () {
    render(<ViewData data={testSankeyData} />);
    expect(screen.getByRole("table")).toBeInTheDocument();
  });

  it("should contain the From, To, Amount, Action headers in the table", function () {
    render(<ViewData data={testSankeyData} />);
    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(screen.getByText("fields.From")).toBeInTheDocument();
    expect(screen.getByText("fields.To")).toBeInTheDocument();
    expect(screen.getByText("fields.Amount")).toBeInTheDocument();
    expect(screen.getByText("fields.Action")).toBeInTheDocument();
  });
});
