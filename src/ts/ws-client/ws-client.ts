export class WsClient {
  private address: string;
  private socket: WebSocket;

  constructor(address: string) {
    this.address = address;
  }

  public connect(): void {
    this.socket = new WebSocket(`ws://${this.address}`);
  }

  public getSocket(): WebSocket {
    return this.socket;
  }
}
