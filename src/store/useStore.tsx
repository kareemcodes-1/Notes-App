import { create } from "zustand";

export type Expense = {
    id: number,
    description: string;
    amount: number;
}

type StoreInitialValues = {
    expenses: Expense[];
    addExpense: (expense: Expense) => void;
    addAmount: (amount: number) => void;
    totalAmount: number;
    deleteExpense: (id: number, amount: number) => void;
}


const storedExpenses = localStorage.getItem('expenses');
const totalAmount = localStorage.getItem('totalAmount');
export const useStore = create<StoreInitialValues>((set) => ({
    expenses: storedExpenses ? JSON.parse(storedExpenses) : [],
    totalAmount: totalAmount ? JSON.parse(totalAmount) : 0,
    addExpense(expense) {
        return set((state) => {
            const createdExpense = [...state.expenses, expense];
            localStorage.setItem('expenses', JSON.stringify(createdExpense))
            return {...state, expenses: createdExpense}
        })
    },
    addAmount: (amount) => {
        return set((state) => {

            const addedAmount = state.totalAmount += amount;
            localStorage.setItem('totalAmount', JSON.stringify(addedAmount));

           return {
            ...state,
            totalAmount: addedAmount,
            }
    })
    },
    deleteExpense(id, amount) {
        return set((state) => {
            const updatedExpenses = state.expenses.filter((expense) => expense.id !== id);

            const updatedTotalAmount = state.totalAmount - amount;

            localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
            localStorage.setItem('totalAmount', JSON.stringify(updatedTotalAmount));


            return {
            ...state,
            expenses: updatedExpenses,
            totalAmount: updatedTotalAmount
            }
     });
    },
}));