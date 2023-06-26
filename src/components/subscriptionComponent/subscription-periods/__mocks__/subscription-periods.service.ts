import { subscriptionPeriodsStub } from '../test/stubs/subscription-periods.stub'

export const SubscriptionPeriodsService = jest.fn().mockReturnValue({
  create: jest.fn().mockResolvedValue(subscriptionPeriodsStub()),
  findAll: jest.fn().mockResolvedValue([subscriptionPeriodsStub()]),
  findByPk: jest.fn().mockResolvedValue(subscriptionPeriodsStub()),
  update: jest.fn().mockResolvedValue({ affectedCount: 1 }),
  destroy: jest.fn().mockResolvedValue(1),
})
