import getLanguageOptions from "../../api/getLanguageOptions";

describe("getLanguageOptions", () => {
  it("should return an array of objects", () => {
    expect(Array.isArray(getLanguageOptions())).toBe(true);
  });
});
