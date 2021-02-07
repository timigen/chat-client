import { Ui } from "../ui/ui";

export class UiHtml implements Ui {
  private window: Window;
  private doc: HTMLDocument;
  private body: HTMLElement;
  private content: HTMLElement;

  constructor(window: Window) {
    this.window = window;
    this.doc = window.document;
    this.body = this.doc.getElementsByTagName("body")[0];
    this.content = this.doc.getElementById("content");
  }

  public connecting() {
    console.log("connecting");
    const newDiv = document.createElement("div");
    const newContent = document.createTextNode("connecting to ...");
    newDiv.appendChild(newContent);
    this.content.append(newDiv);
  }

  public connected() {
    console.log("connected");
  }

  public error() {
    console.log("error");
  }

  public clear() {
    console.log("clear");
  }
}
