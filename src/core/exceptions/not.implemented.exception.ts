import { CloseAdviceException } from './closeAdviceException';

export class NotImplementedYetException extends CloseAdviceException {
  constructor(message: string) {
    super(message);
  }
}
