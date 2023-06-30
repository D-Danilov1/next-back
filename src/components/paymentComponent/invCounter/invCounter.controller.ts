import {
  Controller,
} from '@nestjs/common';

import { InvCounterService } from './invCounter.service';

@Controller('/InvCounter')
export class InvCounterController {
  constructor(protected service: InvCounterService) {}
}
