import { CloseAdviceException } from '@/core/exceptions/closeAdviceException';

export class MovieNotFoundException extends CloseAdviceException {
  constructor(message: string) {
    super(message);
  }
}
