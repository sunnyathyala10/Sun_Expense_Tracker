import React from "react";

import { cleanup, render } from "@testing-library/react";
import SankeyChart from "../../../components/SankeyChart/SankeyChart";

describe("SankeyChart", () => {
  afterEach(cleanup);

  const testSankeyData = [
    ["From", "To", "Amount"],
    ["Income", "Expense", "1000"],
    ["Salary", "Income", "5000"],
    ["Expense", "Electric Bill", "1000"],
  ];

  const testOptions = {
    title: "Test Sankey Chart",
  };

  it("should render a Sankey chart", () => {
    render(<SankeyChart data={testSankeyData} options={testOptions} />);
  });
});
