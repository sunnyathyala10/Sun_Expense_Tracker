import React from "react";

import store from "../../store";

describe("index", function () {
  it("should return the redux store", function () {
    expect(store).toHaveProperty("dispatch");
    expect(store).toHaveProperty("subscribe");
    expect(store).toHaveProperty("getState");
  });
});
