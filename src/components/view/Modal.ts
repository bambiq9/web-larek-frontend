import { IModal, ModalViews } from "../../types/view/Modal";


class Modal implements IModal {
  _closeButton: HTMLElement;
  _container: HTMLElement;

  constructor(_container: HTMLElement) {
  };
  
  open(): void {};

  close(): void {};

  getView(id: ModalViews): HTMLElement {
    return;
  };

  setView(view: HTMLElement): void {};
}