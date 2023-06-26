import { CreateFundsDto } from '../../../../src/components/subscriptionComponent/funds/dto/create-funds.dto'

export const fundsCreateStub = (): CreateFundsDto =>
  <CreateFundsDto>{
    name: 'Test' + Date.now(),
    userEmail: 'admin@gmail.com',
    percent: 100,
  }
