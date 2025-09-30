const en_US = () => {
  return {
    translation: {
      fields: {
        AddIncome: "비용 추적기",
        AddExpense: "비용 추가",
        EditIncome: "소득 편집",
        EditExpense: "비용 수정",
        IncomeType: "소득 유형",
        ExpenseType: "비용 유형",
        Amount: "양",
        ViewDetailedData: "상세 데이터 보기",
        HideDetailedData: "상세 데이터 숨기기",
        From: "에서",
        To: "에게",
        Action: "행동",
        SelectLanguage: "언어 선택",
      },
      errorMessages: {
        enterAmountNumber: "금액란에 숫자를 입력해주세요.",
        editNotAllowed:
          "데이터가 무효화되므로 이 수준을 편집하는 것은 허용되지 않습니다. 각 개별 카테고리를 수정하십시오.",
        deleteNotAllowed:
          "이 수준을 삭제하면 데이터가 무효화되므로 삭제할 수 없습니다. 각 개별 카테고리를 삭제하십시오.",
        frequentRequests: "자주 발생하는 요청이 감지되었습니다.",
      },
      messages: {
        viewPage: "페이지 보기",
        expenseAdded: "비용이 업데이트되었습니다!",
        incomeAdded: "소득이 업데이트되었습니다!",
      },
    },
  };
};

export default en_US;
