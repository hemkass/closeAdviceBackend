import { CloseAdviceException } from '@/core/exceptions/closeAdviceException';

export class UserNotFoundException extends CloseAdviceException {
  constructor(message: string) {
    super(message);
  }
}
