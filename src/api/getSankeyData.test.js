import getSankeyData from "./getSankeyData";

describe("App", () => {
  it("should return an array of objects", () => {
    expect(Array.isArray(getSankeyData)).toBe(true);
  });
});
