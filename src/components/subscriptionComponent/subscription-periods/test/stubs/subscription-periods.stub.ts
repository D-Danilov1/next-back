import { SubscriptionPeriods } from '../../models/subscription-periods.model'

export const subscriptionPeriodsStub = (): SubscriptionPeriods => {
  return <SubscriptionPeriods>{
    id: 1,
    name: '30_DAYS',
    period: 30,
  }
}
