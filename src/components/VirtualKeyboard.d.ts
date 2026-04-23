declare module './VirtualKeyboard.vue' {
  interface Window {
    VKI_attach: (inputElement: HTMLElement) => void;
  }
}
