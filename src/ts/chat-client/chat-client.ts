import { Configuration } from "../configuration/configuration";
import { UiHtml } from "../ui-html/ui-html";
import { Ui } from "../ui/ui";
import { WsClient } from "../ws-client/ws-client";

export class ChatClient {
  private ui: Ui;
  private socket: WsClient;
  private config: Configuration;

  constructor(config: Configuration, window: Window) {
    this.config = config;
    this.ui = new UiHtml(window);
    this.socket = new WsClient(this.config.address);
  }

  public start(): void {
    console.log("ChatClient.starting");
    this.ui.connecting(this.config.address);
    this.socket.connect();

    const socket = this.socket.getSocket();

    socket.onopen = event => {
      console.log(`socket.onopen `, event);
    };

    socket.onmessage = message => {
      console.log(`socket.onmessage `, message);
    };

    socket.onerror = error => {
      console.log(`socket.onerror ${error}`);
    };
  }
}
