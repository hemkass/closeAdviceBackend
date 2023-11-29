import { CloseAdviceException } from '@/core/exceptions/closeAdviceException';

export class GenreAlreadyExistsException extends CloseAdviceException {
  constructor(message: string) {
    super(message);
  }
}
