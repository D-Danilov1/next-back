import { UpdateSubscriptionPeriodsDto } from '../../dto/update-subscription-periods.dto'

export const subscriptionPeriodsUpdateStub = (): UpdateSubscriptionPeriodsDto => {
  return <UpdateSubscriptionPeriodsDto>{
    id: 1,
    name: '30_DAYS',
    period: 30,
  }
}
