import { CreateSubscriptionPeriodsDto } from '../../dto/create-subscription-periods.dto'

export const subscriptionPeriodsCreateStub = (): CreateSubscriptionPeriodsDto => {
  return <CreateSubscriptionPeriodsDto>{
    name: '30_DAYS',
    period: 30,
  }
}
