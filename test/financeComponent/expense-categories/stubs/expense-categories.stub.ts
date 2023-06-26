import { ExpenseCategories } from '../../../../src/components/subscriptionComponent/expense-categories/models/expense-categories.model'

export const expenseCategoriesStub = (): ExpenseCategories => {
  return <ExpenseCategories>{
    id: expect.any(Number),
    name: expect.any(String),
    user_id: expect.any(String),
    is_active: expect.any(Boolean),
    is_system: expect.any(Boolean),
    createdAt: expect.any(String),
    updatedAt: expect.any(String),
  }
}
