import { Injectable } from '@angular/core';
import { PlayIcon } from './play-icons';

@Injectable({
  providedIn: 'root',
})
export class PlayIconRegistryService {
  private registry = new Map<string, string>();

  public registerIcons(icons: PlayIcon[]): void {
    icons.forEach((icon: PlayIcon) => this.registry.set(icon.name, icon.data));
  }

  public getIcon(iconName: string): string | undefined {
    if (!this.registry.has(iconName)) {
      console.warn(
        `We could not find the icon with the name '${iconName}', did you add it to the icon registry?`
      );
    }

    return this.registry.get(iconName);
  }
}
