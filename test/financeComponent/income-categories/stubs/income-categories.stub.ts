import { SubscriptionPeriods } from '../../../../src/components/subscriptionComponent/subscription-periods/models/subscription-periods.model'

export const subscriptionPeriodsStub = (): SubscriptionPeriods => {
  return <SubscriptionPeriods>{
    id: expect.any(Number),
    name: expect.any(String),
    user_id: expect.any(String),
    is_active: expect.any(Boolean),
    is_system: expect.any(Boolean),
    createdAt: expect.any(String),
    updatedAt: expect.any(String),
  }
}
