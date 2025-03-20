export abstract class View<T> {
  _container: HTMLElement;

  constructor(container: HTMLElement) {
    this._container = container;
  }

  abstract render(data?: Partial<T>): HTMLElement | void;
}