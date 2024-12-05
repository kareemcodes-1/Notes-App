import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Expense, useStore } from '../store/useStore';
import ExpenseCard from './ExpenseCard';



const ExpenseTracker = () => {

    const [description, setDescription] = useState<string>('');
    let [amount, setAmount] = useState<string>('');

    const {addExpense, expenses, totalAmount, addAmount} = useStore();
    

    function onSubmit (e: FormEvent<HTMLFormElement>){
        e.preventDefault();
        const data: Expense = {
            id: Date.now(),
            description,
            amount: parseFloat(amount),
        }
        addExpense(data);
        addAmount(parseFloat(amount));
        setDescription('');
        setAmount('');
    }



  return (
    <div className='flex items-center justify-center pt-[5rem]'>
        <form className='bg-[#fff] w-[30rem] p-[1rem] rounded-[1rem]' onSubmit={onSubmit}>
            <h1 className='text-[2rem] font-bold text-[#fdbb2d] text-center mb-[1rem]'>Expense Tracker</h1>

          <div className='flex flex-col gap-[1rem] mb-[2rem]'>
          <div>
           <input type="text" value={description}  id="" placeholder='Expense Description' className='p-[.7rem] border w-full rounded-[.5rem] focus:outline-none focus:ring-2 focus:ring-[#fdbb2d]' onChange={(e: ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)}/>
           </div>

            <div>
            <input type="number" id="" value={amount} placeholder='Amount' className='p-[.7rem] border w-full rounded-[.5rem] focus:ring-2 focus:ring-[#fdbb2d] outline-none' onChange={(e: ChangeEvent<HTMLInputElement>) => setAmount(e.target.value)}/>
            </div>
          </div>

            <button type="submit" className='w-full bg-[#fdbb2d] text-[#fff] p-[.5rem] rounded-[.5rem]'>Add Expense</button>

            <div className='flex flex-col gap-[1rem] mt-[1rem]'>
                {expenses.map((expense) => (
                     <div key={expense.id}>
                      <ExpenseCard expense={expense} />
                     </div>
                ))}
            </div>

            <div className='text-center w-full my-[1rem]'>
                 <h1 className='text-[1.3rem] font-bold text-[#fdbb2d]'>Total Expenses : ${totalAmount} </h1>
            </div>
       </form>
    </div>
  )
}

export default ExpenseTracker