import { CloseAdviceException } from '@/core/exceptions/closeAdviceException';

export class ReviewNotCreatedException extends CloseAdviceException {
  constructor(message: string) {
    super(message);
  }
}
