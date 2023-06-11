const getSankeyData = () => {
  return [
    ["From", "To", "Amount"],
    ["Income", "Expense", 3000],
    ["Salary", "Income", 5000],
    ["Others", "Income", 1000],
    ["Expense", "Electric Bill", 1000],
    ["Expense", "Mobile Bill", 2000],
  ];
};

export default getSankeyData;
