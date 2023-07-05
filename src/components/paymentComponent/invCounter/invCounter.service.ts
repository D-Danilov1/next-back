import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { EntityService } from '../../../classes/core/entity.service';

import { LoggerService } from '../../loggerComponent/logger/logger.service';
import { InvCounter } from './models/invCounter.model';
import { randomUUID } from 'crypto';

@Injectable()
export class InvCounterService extends EntityService<InvCounter> {
  constructor(
    @InjectModel(InvCounter) protected repository: typeof InvCounter,
    protected loggerService: LoggerService,
  ) {
    super(repository, 'InvCounter', loggerService);
  }

  async getNewInvId(): Promise<number> {
    const [invCounter] = await InvCounter.findOrCreate({
      where: {},
      defaults: {
        id: await randomUUID(),
        // @ts-ignore
        inv_id: 50,
      },
    });


    const newInvId = invCounter.inv_id + 1;
    invCounter.inv_id = newInvId;
    await invCounter.save();

    return newInvId;
  }
}
