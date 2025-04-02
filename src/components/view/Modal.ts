import { IEventEmitter } from "../../types";
import { View } from "../base/View";

type IModalData = {
  content: HTMLElement;
}

class Modal extends View<IModalData> {
  closeButton: HTMLElement;
  modalContent: HTMLElement;

  constructor(container: HTMLElement, events: IEventEmitter) {
    super(container);
  };

  set content(data: HTMLElement) {
  }
  
  open(): void {};

  close(): void {};

  render(data: IModalData): HTMLElement {
    return;
  }
}