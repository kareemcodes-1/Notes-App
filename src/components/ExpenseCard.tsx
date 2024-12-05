import React from 'react'
import { Expense, useStore } from '../store/useStore'

const ExpenseCard = ({expense}: {expense: Expense}) => {

    const {deleteExpense} = useStore();

  return (
      <div className='bg-[#e3a01038] w-full py-[.5rem] px-[.8rem] rounded-[.5rem] flex items-center justify-between'>
          <div className='flex items-center gap-[.5rem]'>
               <h1 className='font-bold'>{expense.description}</h1>: <span className='text-[#fdbb2d] font-bold'>${expense.amount}</span>
          </div>

          <div>
               <button type="button" className='bg-red-500 text-white p-[.5rem] rounded-[.5rem]' onClick={() => deleteExpense(expense.id, expense.amount)}>Delete</button>
          </div>
      </div>
  )
}

export default ExpenseCard