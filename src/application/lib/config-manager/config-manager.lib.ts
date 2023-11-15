import { injectable } from 'inversify';

@injectable()
export abstract class ConfigManager {
  abstract get(key: string): string | null | undefined;
  abstract getOrThrowError(key: string): string;
}
