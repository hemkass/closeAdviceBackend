import { CloseAdviceException } from '@/core/exceptions/closeAdviceException';

export class GenreNotFoundException extends CloseAdviceException {
  constructor(message: string) {
    super(message);
  }
}
