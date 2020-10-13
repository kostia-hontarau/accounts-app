import { AccountDataModel } from "../models";
import { Account } from "../../business/types";

export class AccountRepository {
  private accountDataModel: AccountDataModel;

  constructor(dependencies: { accountDataModel: AccountDataModel }) {
    this.accountDataModel = dependencies.accountDataModel;
  }

  async get(email: string): Promise<Account | null> {
    const rawAccount = await this.accountDataModel.findOne(
      {
        email,
      },
      null,
      {
        lean: true,
      }
    );

    return rawAccount ? this.mapToAccount(rawAccount) : null;
  }

  async create(account: Account): Promise<Account> {
    const rawAccount = await this.accountDataModel.create(account);

    return this.mapToAccount(rawAccount);
  }

  async update(
    email: string,
    account: Partial<Account>
  ): Promise<Account | null> {
    const rawAccount = await this.accountDataModel.findOneAndUpdate(
      {
        email,
      },
      account,
      {
        lean: true,
        new: true,
      }
    );

    return rawAccount ? this.mapToAccount(rawAccount) : null;
  }

  async remove(email: string) {
    await this.accountDataModel.deleteOne({
      email,
    });
  }

  private mapToAccount(rawAccount: Account): Account {
    return {
      name: rawAccount.name,
      surname: rawAccount.surname,
      email: rawAccount.email,
      city: rawAccount.city,
      phone: rawAccount.phone,
      postalCode: rawAccount.postalCode,
      passwordHash: rawAccount.passwordHash,
      createdAt: rawAccount.createdAt,
      updatedAt: rawAccount.updatedAt,
    };
  }
}
