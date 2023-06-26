import { CreateSubscriptionPeriodsDto } from '../../../../src/components/subscriptionComponent/subscription-periods/dto/create-subscription-periods.dto'

export const subscriptionPeriodsCreateStub = (): CreateSubscriptionPeriodsDto => {
  return <CreateSubscriptionPeriodsDto>{
    name: 'Test' + Date.now(),
    userEmail: 'admin@gmail.com',
  }
}
