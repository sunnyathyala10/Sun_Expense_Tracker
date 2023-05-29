const getSankeyData = () => {
  return [
    ["From", "To", "Amount"],
    ["Salary", "Income", 5000],
    ["Others", "Income", 1000],
    ["Income", "Electric Bill", 1000],
    ["Electric Bill", "Expense", 1000],
    ["Income", "Mobile Bill", 2000],
    ["Mobile Bill", "Expense", 2000],
  ];
};

export default getSankeyData();
