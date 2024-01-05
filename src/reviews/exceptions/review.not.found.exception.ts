import { CloseAdviceException } from '@/core/exceptions/closeAdviceException';

export class ReviewNotFoundException extends CloseAdviceException {
  constructor(message: string) {
    super(message);
  }
}
