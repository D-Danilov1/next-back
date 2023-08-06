import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Subscriptions } from './models/subscriptions.model';
import { EntityService } from '../../../classes/core/entity.service';
import { Users } from '../../usersComponent/users/models/users.model';
import { UsersService } from '../../usersComponent/users/users.service';
import { CreateSubscriptionsDto } from './dto/create-subscriptions.dto';
import { LoggerService } from '../../loggerComponent/logger/logger.service';
import { UpdateSubscriptionsDto } from './dto/update-subscriptions.dto';
import { SubscriptionPeriodsService } from '../subscription-periods/subscription-periods.service';

@Injectable()
export class SubscriptionsService extends EntityService<Subscriptions> {
  constructor(
    @InjectModel(Subscriptions) protected repository: typeof Subscriptions,
    private usersService: UsersService,
    protected loggerService: LoggerService,
    private subscriptionPeriodsService: SubscriptionPeriodsService,
  ) {
    super(repository, 'Subscriptions', loggerService);
  }

  async create(dto: CreateSubscriptionsDto): Promise<Subscriptions> {
    const user: Users | false = await this.usersService.findByEmail(
      dto.userEmail,
    );
    if (!user) return;

    await this.loggerService?.create({
      user_id: user.id,
      method_name: 'Create',
      model_name: 'Subscriptions',
      props: JSON.stringify(dto),
    });

    return await this.repository.create({ ...dto, user_id: user.id });
  }

  async update(dto: UpdateSubscriptionsDto) {
    const user: Users | false = await this.usersService.findByEmail(
      dto.userEmail,
    );
    if (!user) return;

    return this.repository.update(dto, { where: { user_id: user.id } });
  }

  async findByUserId(id: string | number): Promise<Subscriptions> {
    return await this.repository.findOne({ where: { user_id: id } });
  }

  async hasSubscriptionActive(userEmail: string): Promise<boolean> {
    if (!userEmail) return false;

    const user: Users | false = await this.usersService.findByEmail(userEmail);

    if (!user) return false;

    const subscription: Subscriptions | null = await this.repository.findOne({
      where: { user_id: user.id },
      order: [['createdAt', 'DESC']],
    });

    if (!subscription) {
      return false;
    }

    const currentDate: Date = new Date();
    const endOfSubscription: Date = new Date(subscription.end_of);

    return endOfSubscription > currentDate;
  }

  async paidWithStripe(userEmail: string): Promise<boolean> {
    if (!userEmail) return false;
    const user: Users | false = await this.usersService.findByEmail(userEmail);

    if (!user) return false;

    const subscription: Subscriptions | null = await this.repository.findOne({
      where: { user_id: user.id },
    });

    if (!subscription?.subscription_id) {
      return false;
    }
    return true;
  }

  async createSubscription(email: string, period: string) {
    const userObj = {
      email: email,
      phone_number: '',
    };

    const user = await this.usersService.create(userObj);

    const calculateEndDate = (startDate: any, period: any) => {
      const endDate = new Date(startDate);
      endDate.setMonth(endDate.getMonth() + Number(period));
      return endDate.toISOString();
    };

    const subscriptionPeriodObj = {
      name: `${period}_MONTH${Number(period) > 1 ? 'S' : ''}`,
      period: Number(period),
    };

    const subscriptionPeriod = await this.subscriptionPeriodsService.create(
      subscriptionPeriodObj,
    );

    const subscriptionObj = {
      userEmail: user.email,
      subscription_period_id: subscriptionPeriod.id,
      payment_amount: Number(period).toString(),
      start_of: new Date().toISOString(),
      end_of: calculateEndDate(new Date(), period),
    };

    const subscription = await this.create(
      subscriptionObj,
    );
    return subscription;
  }
}
