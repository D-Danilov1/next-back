import { CreateExpenseCategoriesDto } from '../../../../src/components/subscriptionComponent/expense-categories/dto/create-expense-categories.dto'

export const expenseCategoriesCreateStub = (): CreateExpenseCategoriesDto => {
  return <CreateExpenseCategoriesDto>{
    name: 'Test' + Date.now(),
    userEmail: 'admin@gmail.com',
  }
}
