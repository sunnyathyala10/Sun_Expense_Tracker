import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import {
  render,
  cleanup,
  fireEvent,
  screen,
  act,
} from "@testing-library/react";
import SankeyData from "../store/SankeyData-slice";

import App from "./App";
import userEvent from "@testing-library/user-event";

jest.mock("react-i18next", () => ({
  useTranslation: () => {
    return {
      t: (str) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
}));

const renderWithRedux = (
  component,
  { store = createStore(SankeyData) } = {}
) => {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store,
  };
};

describe("App", () => {
  afterEach(cleanup);

  it("should have an image tag in the document", () => {
    renderWithRedux(<App />);
    expect(screen.getByRole("img")).toBeInTheDocument();
  });

  it("should have a Add Income button in the document", () => {
    renderWithRedux(<App />);
    expect(screen.getByText("fields.AddIncome")).toBeInTheDocument();
  });

  it("should have a Add Expense button in the document", () => {
    renderWithRedux(<App />);
    expect(screen.getByText("fields.AddExpense")).toBeInTheDocument();
  });

  it("should have a View Detailed Section", () => {
    renderWithRedux(<App />);
    expect(screen.getByText("▶ fields.ViewDetailedData")).toBeInTheDocument();
  });

  it("should display table on click of ViewDetailedData", () => {
    renderWithRedux(<App />);
    expect(screen.queryByRole("table")).not.toBeInTheDocument();
    fireEvent.click(screen.getByText("▶ fields.ViewDetailedData"));
    fireEvent.click(screen.getAllByRole("button")[4]);
    expect(screen.getByRole("table")).toBeInTheDocument();
  });

  it("should have modal component when AddIncome button is clicked", () => {
    renderWithRedux(<App />);
    fireEvent.click(screen.getByText("fields.AddIncome"));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("should have Income related fields when AddIncome button is clicked", () => {
    renderWithRedux(<App />);
    fireEvent.click(screen.getByText("fields.AddIncome"));
    expect(screen.getAllByText("fields.IncomeType")[0]).toBeInTheDocument();
    expect(screen.getAllByText("fields.Amount")[0]).toBeInTheDocument();
  });

  it("should have modal component when AddExpense button is clicked", () => {
    renderWithRedux(<App />);
    fireEvent.click(screen.getByText("fields.AddExpense"));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("should have Expense related fields when AddExpense button is clicked", () => {
    renderWithRedux(<App />);
    fireEvent.click(screen.getByText("fields.AddExpense"));
    expect(screen.getAllByText("fields.ExpenseType")[0]).toBeInTheDocument();
    expect(screen.getAllByText("fields.Amount")[0]).toBeInTheDocument();
  });

  it("should submit modal after submitting the income", async () => {
    renderWithRedux(<App />);
    const user = userEvent.setup();
    fireEvent.click(screen.getAllByRole("button")[0]);

    expect(screen.getByRole("dialog")).toBeInTheDocument();

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      const incomeTypeInput = screen.getAllByRole("textbox")[0];
      await user.type(incomeTypeInput, "Income 1");
      fireEvent.blur(incomeTypeInput);
    });

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      const amount = screen.getAllByRole("textbox")[1];
      await user.type(amount, "2000");
      fireEvent.blur(amount);
    });

    const addIncomeBtn = screen.getAllByRole("button")[2];
    fireEvent.click(addIncomeBtn);

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("should trigger the alert when amount value is not a number", async () => {
    renderWithRedux(<App />);
    window.alert = jest.fn();

    const user = userEvent.setup();
    fireEvent.click(screen.getAllByRole("button")[0]);

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      const amount = screen.getAllByRole("textbox")[1];
      await user.type(amount, "abcd");
      fireEvent.blur(amount);
    });

    expect(window.alert).toHaveBeenCalledWith(
      "errorMessages.enterAmountNumber"
    );
  });

  it("should submit modal after submitting the expense", async () => {
    renderWithRedux(<App />);
    const user = userEvent.setup();
    fireEvent.click(screen.getAllByRole("button")[1]);

    expect(screen.getByRole("dialog")).toBeInTheDocument();

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      const expenseTypeInput = screen.getAllByRole("textbox")[0];
      await user.type(expenseTypeInput, "Expense 1");
      fireEvent.blur(expenseTypeInput);
    });

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      const amount = screen.getAllByRole("textbox")[1];
      await user.type(amount, "1000");
      fireEvent.blur(amount);
    });

    const addExpenseBtn = screen.getAllByRole("button")[2];
    fireEvent.click(addExpenseBtn);

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("should close the modal on overlay click", async () => {
    renderWithRedux(<App />);
    fireEvent.click(screen.getAllByRole("button")[0]);
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    // eslint-disable-next-line testing-library/no-node-access
    const overlayElement = screen.getByRole("dialog").parentElement;
    fireEvent.click(overlayElement);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
