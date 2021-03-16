import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { type } from 'node:os';
import { Account, AccountDocument } from 'src/accounts/schema/account.schema';
import { User, UserDocument } from 'src/users/schema/user.schema';
import { CreateTransactionDTO } from './dto/create-transaction.dto';
import { Transaction, TransactionDocument } from './schema/transaction.schema';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel(Transaction.name)
    private transactionModel: Model<TransactionDocument>,
    @InjectModel(Account.name)
    private accountModel: Model<AccountDocument>,
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async getAll() {
    return this.transactionModel.find().exec();
  }

  async createPayment(transactionDTO: CreateTransactionDTO) {
    const type = 'payment';

    const user = await this.userModel.findOne({
      email: transactionDTO.email,
    });
    const account = await this.accountModel.findOne({
      userID: user.id,
    });
    const t = await this.transactionModel.findOne({
      paymentId: transactionDTO.paymentId,
    });
    if (t) {
      return {
        error: {
          msg: 'transaction not possible',
        },
      };
    }

    const transaction = new this.transactionModel({
      ...transactionDTO,
      type,
    });

    console.log(transaction);

    account.fundsAmount =
      '' + (Number(account.fundsAmount) + transactionDTO.amount);
    account.history.push(transaction._id);

    await account.save();
    return transaction.save();
  }

  async createTransfer(transactionDTO: CreateTransactionDTO) {
    const type = 'transfer';
    console.log(transactionDTO);
    const userFrom = await this.userModel.findById(transactionDTO.userFrom);
    const userTo = await this.userModel.findById(transactionDTO.userTo);
    console.log({ userFrom, userTo });
    const accountFrom = await this.accountModel.findOne({
      userID: userFrom._id,
    });
    const accountTo = await this.accountModel.findOne({
      userID: userTo._id,
    });

    const transaction = new this.transactionModel({
      ...transactionDTO,
      type,
    });

    accountFrom.fundsAmount =
      '' + (Number(accountFrom.fundsAmount) - transactionDTO.amount);
    if (Number(accountFrom.fundsAmount) < 0) {
      return {
        error: {
          msg: 'transaction not possible',
        },
      };
    }
    accountFrom.history.push(transaction._id);
    accountTo.fundsAmount =
      '' + (Number(accountTo.fundsAmount) + transactionDTO.amount);
    accountTo.history.push(transaction._id);

    await accountFrom.save();
    await accountTo.save();
    return transaction.save();
  }
}
