import { AccountRepository } from "../../data-access/repository";
import {
  Account,
  AccountRegistrationRequest,
  AccountUpdateRequest,
  AuthenticationRequest,
} from "../types";
import bcrypt from "bcrypt";
import { BusinessValidationError } from "../errors";
import _ from "lodash";
import { AccountNotFoundError } from "../errors/account-not-found-error";

const SALT_ROUNDS = 10;

export class AccountService {
  private accountRepository: AccountRepository;

  constructor(dependencies: { accountRepository: AccountRepository }) {
    this.accountRepository = dependencies.accountRepository;
  }

  async get(email: string): Promise<Account | null> {
    return this.accountRepository.get(email);
  }

  async authenticate(
    authenticationRequest: AuthenticationRequest
  ): Promise<Account | null> {
    const account = await this.accountRepository.get(
      authenticationRequest.email
    );
    if (!account) return null;

    const isPasswordMatched = await bcrypt.compare(
      authenticationRequest.password,
      account.passwordHash
    );

    return isPasswordMatched ? account : null;
  }

  async register(
    accountRegistrationRequest: AccountRegistrationRequest
  ): Promise<Account> {
    const passwordHash = await bcrypt.hash(
      accountRegistrationRequest.password,
      SALT_ROUNDS
    );
    const account: Account = {
      ...accountRegistrationRequest,
      passwordHash,
      createdAt: null,
      updatedAt: null,
    };

    try {
      return await this.accountRepository.create(account);
    } catch (error) {
      if (error.message.includes("duplicate key error")) {
        throw new BusinessValidationError(
          "Account with same email already exists"
        );
      }

      throw error;
    }
  }

  async update(
    email: string,
    accountUpdateRequest: AccountUpdateRequest
  ): Promise<Account | null> {
    const accountUpdate: Partial<Account> = _.omit(accountUpdateRequest, [
      "oldPassword",
      "newPassword",
    ]);
    await this.matchPassword(email, accountUpdateRequest.oldPassword);
    if (accountUpdateRequest.newPassword) {
      accountUpdate.passwordHash = await bcrypt.hash(
        accountUpdateRequest.newPassword,
        SALT_ROUNDS
      );
    }

    try {
      return await this.accountRepository.update(email, accountUpdate);
    } catch (error) {
      if (error.message.includes("duplicate key error")) {
        throw new BusinessValidationError(
          "Account with same email already exists"
        );
      }

      throw error;
    }
  }

  async remove(email: string): Promise<void> {
    return await this.accountRepository.remove(email);
  }

  private async matchPassword(
    email: string,
    oldPassword: string
  ): Promise<void> {
    const account = await this.accountRepository.get(email);
    if (!account) {
      throw new AccountNotFoundError("Account not found");
    }
    const isPasswordMathed = await bcrypt.compare(
      oldPassword,
      account.passwordHash
    );

    if (!isPasswordMathed) {
      throw new BusinessValidationError("Old password is incorrect!");
    }
  }
}
