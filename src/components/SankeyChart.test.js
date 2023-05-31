import { render } from "@testing-library/react";
import SankeyChart from "./SankeyChart";

describe("SankeyChart", () => {
  it("should render a Sankey chart", () => {
    const { asFragment } = render(<SankeyChart />);
    expect(asFragment(<SankeyChart />)).toMatchSnapshot();
  });
});
