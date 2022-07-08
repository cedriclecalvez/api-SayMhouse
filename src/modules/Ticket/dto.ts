export class TicketDTO {
  id: any;
  name: string;
  isProcessing: boolean;
  constructor({
    id,
    name,
    isProcessing,
  }: {
    id: any;
    name: string;
    isProcessing: boolean;
  }) {
    this.id = id;
    this.name = name;
    this.isProcessing = isProcessing;
  }
}
