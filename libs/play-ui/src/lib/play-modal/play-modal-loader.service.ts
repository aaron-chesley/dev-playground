import { ComponentType } from '@angular/cdk/portal';
import {
  Injectable,
  ApplicationRef,
  ComponentFactoryResolver,
  Injector,
  EmbeddedViewRef,
} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PlayModalLoaderService {
  constructor(
    private _appRef: ApplicationRef,
    private _resolver: ComponentFactoryResolver,
    private _injector: Injector
  ) {}

  loadStyles<T>(component: ComponentType<T>): void {
    // Create the component:
    const componentRef = this._resolver
      .resolveComponentFactory(component)
      .create(this._injector);

    this._appRef.attachView(componentRef.hostView);

    // Attach the component to the root node:
    const element = document.body;

    element.appendChild(
      (componentRef.hostView as EmbeddedViewRef<any>)
        .rootNodes[0] as HTMLElement
    );

    // Remove the component:
    this._appRef.detachView(componentRef.hostView);
    componentRef.destroy();
  }
}
