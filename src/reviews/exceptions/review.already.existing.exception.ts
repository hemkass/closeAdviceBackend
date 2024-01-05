import { CloseAdviceException } from '@/core/exceptions/closeAdviceException';

export class ReviewAlreadyExistsException extends CloseAdviceException {
  constructor(message: string) {
    super(message);
  }
}
