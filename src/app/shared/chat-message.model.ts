export class ChatMessageModel {
  senderName: string;
  message: string;
  recipientName: string;

  constructor(senderName: string,
              message: string,
              recipientName: string) {
    this.senderName = senderName;
    this.message = message;
    this.recipientName = recipientName;
  }
}
