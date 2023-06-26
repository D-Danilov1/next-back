import { Expense } from '../../../../src/components/subscriptionComponent/expense/models/expense.model'

export const expenseStub = (): Expense => {
  return <Expense>{
    id: expect.any(Number),
    sum: expect.any(Number),
    user_id: expect.any(String),
    expense_category_id: expect.any(Number),
    fund_id: expect.any(Number),
    comment: expect.any(String),
    date: expect.any(String),
    createdAt: expect.any(String),
    updatedAt: expect.any(String),
  }
}
