import { CloseAdviceException } from '@/core/exceptions/closeAdviceException';

export class UserAlreadyExistsException extends CloseAdviceException {
  constructor(message: string) {
    super(message);
  }
}
