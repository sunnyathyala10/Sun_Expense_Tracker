import getSankeyData from "../../api/getSankeyData";

describe("getSankeyData", () => {
  it("should return an array of objects", () => {
    expect(Array.isArray(getSankeyData())).toBe(true);
  });
});
