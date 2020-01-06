export class Mail {
  readonly to: string;
  readonly from: string;
  readonly fromname: string;
  readonly subject: string;
  readonly html?: string;
  readonly text?: string;
}
