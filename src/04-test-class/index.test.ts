import { BankAccount, getBankAccount } from './index';
import { random } from 'lodash';

jest.mock('lodash', () => ({
  random: jest.fn()
}))

describe('BankAccount', () => {
  let account: BankAccount;
  let anotherAccount: BankAccount;

  beforeEach(() => {
    account = getBankAccount(100)
    anotherAccount = getBankAccount(50)
  })

  test('should create account with initial balance', () => {
    expect(account.getBalance()).toBe(100)
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => account.withdraw(200)).toThrow('Insufficient funds: cannot withdraw more than 100')
  });

  test('should throw error when transferring more than balance', () => {
    expect(() => account.transfer(200, anotherAccount)).toThrow('Insufficient funds: cannot withdraw more than 100')
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => account.transfer(50, account)).toThrow('Transfer failed')
  });

  test('should deposit money', () => {
    account.deposit(50)
    expect(account.getBalance()).toBe(150)
  });

  test('should withdraw money', () => {
    account.withdraw(50)
    expect(account.getBalance()).toBe(50)
  });

  test('should transfer money', () => {
    account.transfer(50, anotherAccount)
    expect(account.getBalance()).toBe(50)
    expect(anotherAccount.getBalance()).toBe(100)
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    (random as jest.Mock).mockReturnValueOnce(75)

    const balance = await account.fetchBalance()
    expect(balance).toBe(75)
  });

  test('should set new balance if fetchBalance returned number', async () => {
    (random as jest.Mock).mockReturnValueOnce(75)

    await account.synchronizeBalance()
    expect(account.getBalance()).toBe(75)
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    (random as jest.Mock).mockReturnValueOnce(0)

    try {
      await account.synchronizeBalance()
    } catch (error) {
      expect((error as Error).message).toThrow('Synchronization failed')
    }
  });
});
