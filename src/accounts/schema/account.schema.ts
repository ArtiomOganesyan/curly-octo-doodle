import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type AccountDocument = Account & mongoose.Document;

@Schema()
export class Account {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userID: string;
  @Prop()
  fundsAmount: string;
  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Transaction' }],
  })
  history: string[];
}

export const AccountSchema = SchemaFactory.createForClass(Account);
