import { subscriptionPeriodsStub } from '../test/stubs/subscription-periods.stub'

export const SubscriptionPeriodsModel = {
  create: jest.fn().mockImplementation(() => {
    return subscriptionPeriodsStub()
  }),
  findAll: jest.fn().mockImplementation(() => {
    return [subscriptionPeriodsStub()]
  }),
  findOne: jest.fn().mockImplementation(() => {
    return subscriptionPeriodsStub()
  }),
  findByPk: jest.fn().mockImplementation(() => {
    return subscriptionPeriodsStub()
  }),
  update: jest.fn().mockImplementation(() => {
    return 1
  }),
  destroy: jest.fn().mockImplementation(() => {
    return 1
  }),
}
