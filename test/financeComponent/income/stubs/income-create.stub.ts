import { CreateSubscriptionsDto } from '../../../../src/components/subscriptionComponent/subscriptions/dto/create-subscriptions.dto'

export const subscriptionsCreateStub = (): CreateSubscriptionsDto => {
  return <CreateSubscriptionsDto>{
    sum: 100,
    userEmail: 'admin@gmail.com',
    subscriptions_category_id: 1,
    comment: 'Test' + Date.now(),
    date: '2023-01-01 00:00:00',
  }
}
