import { CreateSubscriptionsDto } from '../../dto/create-subscriptions.dto'

export const subscriptionsCreateStub = (): CreateSubscriptionsDto => {
  return <CreateSubscriptionsDto>{
    userEmail: 'user@gmail.com',
    subscription_period_id: 1,
    payment_amount: '100$',
    start_of: '2023-01-01 00:00:00',
    end_of: '2023-01-01 00:00:00',
  }
}
