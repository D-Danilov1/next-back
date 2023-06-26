import { CreateExpenseDto } from '../../../../src/components/subscriptionComponent/expense/dto/create-expense.dto'

export const expenseCreateStub = (): CreateExpenseDto => {
  return <CreateExpenseDto>{
    sum: 100,
    userEmail: 'admin@gmail.com',
    expense_category_id: 1,
    fund_id: 1,
    comment: 'Test' + Date.now(),
    date: '2023-01-01 00:00:00',
  }
}
