import SankeyDataSlice from "../../store/SankeyData-slice";

describe("SankeyDataSlice", () => {
  let testState;

  beforeEach(() => {
    testState = [
      ["From", "To", "Amount"],
      ["Income", "Expense", 2000],
      ["Salary", "Income", 5000],
      ["Expense", "Mobile Bill", 2000],
    ];
  });

  it("should add the new amount to the existing amount, if dispatch type is add and entry exists in the state", function () {
    const result = SankeyDataSlice(
      { dataArr: testState },
      {
        type: "add",
        payload: ["Income", "Expense", 1000],
      }
    );

    expect(result).toEqual({
      dataArr: [
        ["From", "To", "Amount"],
        ["Income", "Expense", 3000],
        ["Salary", "Income", 5000],
        ["Expense", "Mobile Bill", 2000],
      ],
    });
  });

  it("should push the new entry to the existing state, if dispatch type is add and entry does not exist in the state", function () {
    const result = SankeyDataSlice(
      { dataArr: testState },
      {
        type: "add",
        payload: ["abc", "Income", 1000],
      }
    );

    expect(result).toEqual({
      dataArr: [
        ["From", "To", "Amount"],
        ["Income", "Expense", 2000],
        ["Salary", "Income", 5000],
        ["Expense", "Mobile Bill", 2000],
        ["abc", "Income", 1000],
      ],
    });
  });

  it("should edit the amount to the existing state, if dispatch type is edit", function () {
    const result = SankeyDataSlice(
      { dataArr: testState },
      {
        type: "edit",
        payload: ["Salary", "Income", 6000],
      }
    );

    expect(result).toEqual({
      dataArr: [
        ["From", "To", "Amount"],
        ["Income", "Expense", 2000],
        ["Salary", "Income", 6000],
        ["Expense", "Mobile Bill", 2000],
      ],
    });
  });

  it("should adjust the amount between Income and Expense, if dispatch type is edit and first payload value is Expense", function () {
    const result = SankeyDataSlice(
      { dataArr: testState },
      {
        type: "edit",
        payload: ["Expense", "Mobile Bill", 3000],
      }
    );

    expect(result).toEqual({
      dataArr: [
        ["From", "To", "Amount"],
        ["Income", "Expense", 3000],
        ["Salary", "Income", 5000],
        ["Expense", "Mobile Bill", 3000],
      ],
    });
  });

  it("should delete the entry from the existing state, if dispatch type is delete", function () {
    const result = SankeyDataSlice(
      { dataArr: testState },
      {
        type: "delete",
        payload: { index: 2 },
      }
    );

    expect(result).toEqual({
      dataArr: [
        ["From", "To", "Amount"],
        ["Income", "Expense", 2000],
        ["Expense", "Mobile Bill", 2000],
      ],
    });
  });

  it("should delete the entry from the existing state and also adjust Income Expense amount, if dispatch type is delete and if expense entry is being deleted", function () {
    const result = SankeyDataSlice(
      { dataArr: testState },
      {
        type: "delete",
        payload: { index: 3 },
      }
    );

    expect(result).toEqual({
      dataArr: [
        ["From", "To", "Amount"],
        ["Income", "Expense", 0],
        ["Salary", "Income", 5000],
      ],
    });
  });

  it("should return the same state is state is something other than specified.", function () {
    const result = SankeyDataSlice(
      { dataArr: testState },
      {
        type: "something",
      }
    );

    expect(result).toEqual({
      dataArr: [
        ["From", "To", "Amount"],
        ["Income", "Expense", 2000],
        ["Salary", "Income", 5000],
        ["Expense", "Mobile Bill", 2000],
      ],
    });
  });
});
