import { CloseAdviceException } from '@/core/exceptions/closeAdviceException';

export class MovieNotCreatedException extends CloseAdviceException {
  constructor(message: string) {
    super(message);
  }
}
