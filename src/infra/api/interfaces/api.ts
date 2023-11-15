import { injectable } from 'inversify';

@injectable()
export abstract class Api {
  abstract run(): Promise<void> | void;
}
