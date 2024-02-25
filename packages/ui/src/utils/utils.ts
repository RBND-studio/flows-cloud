export const clipboard = {
  copy: (text: string): Promise<void> => {
    const prevActive = document.activeElement as HTMLElement;
    const textArea = document.createElement("textarea");

    textArea.value = text;

    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";

    document.body.appendChild(textArea);

    textArea.focus();
    textArea.select();

    return new Promise((res, rej) => {
      document.execCommand("copy") ? res() : rej();

      textArea.remove();

      prevActive.focus();
    });
  },
};
