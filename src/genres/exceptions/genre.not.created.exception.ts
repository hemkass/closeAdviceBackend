import { CloseAdviceException } from '@/core/exceptions/closeAdviceException';

export class GenreNotCreatedException extends CloseAdviceException {
  constructor(message: string) {
    super(message);
  }
}
