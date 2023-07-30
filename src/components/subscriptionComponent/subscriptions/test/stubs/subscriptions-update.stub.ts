import { UpdateSubscriptionsDto } from '../../dto/update-subscriptions.dto';

export const subscriptionsUpdateStub = (): UpdateSubscriptionsDto => {
  return <UpdateSubscriptionsDto>{
    userEmail: 'test@mail.ru',
    end_of: '2023-01-01 00:00:00',
  };
};
