export abstract class View<T> {
  container: HTMLElement;

  constructor(container: HTMLElement) {
    this.container = container;
  }

  toggleClass(element: HTMLElement, className: string, force?: boolean) {
  }

  setText(element: HTMLElement, value: unknown) {
  }

  setDisabled(element: HTMLElement, state: boolean) {
  }

  render(data?: Partial<T>): HTMLElement {
    return;
  }
}