import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAccountDTO } from './dto/create-account.dto';
import { PatchAccountDTO } from './dto/patch-account.dto';
import { Account, AccountDocument } from './schema/account.schema';

@Injectable()
export class AccountsService {
  constructor(
    @InjectModel(Account.name) private accountModel: Model<AccountDocument>,
  ) {}
  async getAll(): Promise<Account[]> {
    return this.accountModel.find().exec();
  }
  async getOne(userID: string): Promise<Account> {
    return this.accountModel.findOne({ userID: userID }).exec();
  }
  async create(accountDTO: CreateAccountDTO): Promise<Account> {
    let account = await this.accountModel
      .findOne({ userID: accountDTO.userID })
      .exec();
    if (account) {
      return account;
    }
    account = new this.accountModel({ ...accountDTO, history: [] });
    return account.save();
  }
  async remove(id: string): Promise<Account> {
    return this.accountModel.findByIdAndRemove(id);
  }
  async patch(id: string, accountDTO: PatchAccountDTO): Promise<Account> {
    return this.accountModel.findByIdAndUpdate(
      id,
      { ...accountDTO },
      {},
      (err: any, doc: AccountDocument, res: any) => {
        return doc;
      },
    );
  }
}
