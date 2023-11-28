import { PFSException } from '@core/exceptions/PFSException';

export class UserAlreadyExistsException extends PFSException {
  constructor(message: string) {
    super(message);
  }
}
