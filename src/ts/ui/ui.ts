export interface Ui {
  connecting(address: string): void;
  connected(): void;
  error(): void;
  clear(): void;
}
