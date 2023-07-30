import { CloseAdviceException } from './closeAdviceException';

export class ArgumentRequireException extends CloseAdviceException {
  constructor(message: string) {
    super(message);
  }
}
