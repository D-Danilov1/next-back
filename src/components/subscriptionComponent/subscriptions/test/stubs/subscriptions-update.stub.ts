import { UpdateSubscriptionsDto } from '../../dto/update-subscriptions.dto'

export const subscriptionsUpdateStub = (): UpdateSubscriptionsDto => {
  return <UpdateSubscriptionsDto>{
    id: 1,
    user_id: '4b6bea0b-62d4-40a9-a350-ae40632dc15f',
    subscriptions_period_id: 1,
    payment_amount: '100$',
    start_of: '2023-01-01 00:00:00',
    end_of: '2023-01-01 00:00:00',
  }
}
