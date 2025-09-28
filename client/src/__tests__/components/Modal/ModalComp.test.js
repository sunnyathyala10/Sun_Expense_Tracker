import React from "react";

import { cleanup, render, screen } from "@testing-library/react";
import ModalComp from "../../../components/Modal/ModalComp";

describe("ModalComp", () => {
  afterEach(cleanup);
  it("should return a dialog component.", function () {
    render(<ModalComp showModal={true} />);

    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("should contain the children that are passed through the props.", function () {
    render(
      <ModalComp showModal={true}>
        <p>Testing the Modal</p>
      </ModalComp>
    );
    expect(screen.getByText("Testing the Modal")).toBeInTheDocument();
  });
});
