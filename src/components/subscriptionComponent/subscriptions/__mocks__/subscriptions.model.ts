import { subscriptionsStub } from '../test/stubs/subscriptions.stub'

export const SubscriptionsModel = {
  create: jest.fn().mockImplementation(() => {
    return subscriptionsStub()
  }),
  findAll: jest.fn().mockImplementation(() => {
    return [subscriptionsStub()]
  }),
  findOne: jest.fn().mockImplementation(() => {
    return subscriptionsStub()
  }),
  findByPk: jest.fn().mockImplementation(() => {
    return subscriptionsStub()
  }),
  update: jest.fn().mockImplementation(() => {
    return 1
  }),
  destroy: jest.fn().mockImplementation(() => {
    return 1
  }),
}
