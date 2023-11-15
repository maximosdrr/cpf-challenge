import { injectable } from 'inversify';
import { ConfigManager } from '../../../application/lib/config-manager/config-manager.lib';

@injectable()
export class ConfigManagerImpl implements ConfigManager {
  get(key: string): string | null | undefined {
    return process.env[key];
  }

  getOrThrowError(key: string): string {
    const data = process.env[key];

    if (!data) throw new Error(`${key} is not defined`);

    return data;
  }
}
