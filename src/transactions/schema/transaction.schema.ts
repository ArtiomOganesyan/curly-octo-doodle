import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type TransactionDocument = Transaction & mongoose.Document;

@Schema()
export class Transaction {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userFrom: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userTo: string;
  @Prop()
  type: string;
  @Prop()
  amount: number;
  @Prop()
  paymentId: string;
  @Prop()
  email: string;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
