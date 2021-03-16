export class CreateTransactionDTO {
  readonly userFrom: string;
  readonly userTo: string;
  readonly type: string;
  readonly amount: number;
  readonly paymentId: string;
  readonly email: string;
}
