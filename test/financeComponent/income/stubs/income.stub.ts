import { Subscriptions } from '../../../../src/components/subscriptionComponent/subscriptions/models/subscriptions.model'

export const subscriptionsStub = (): Subscriptions => {
  return <Subscriptions>{
    id: expect.any(Number),
    sum: expect.any(Number),
    user_id: expect.any(String),
    subscriptions_category_id: expect.any(Number),
    comment: expect.any(String),
    date: expect.any(String),
    createdAt: expect.any(String),
    updatedAt: expect.any(String),
  }
}
