import { CloseAdviceException } from '@/core/exceptions/closeAdviceException';

export class MovieAlreadyExistsException extends CloseAdviceException {
  constructor(message: string) {
    super(message);
  }
}
