import { CloseAdviceException } from '@/core/exceptions/closeAdviceException';

export class UserNotCreatedException extends CloseAdviceException {
  constructor(message: string) {
    super(message);
  }
}
