import {
  ContractTransaction,
  ContractInterface,
  BytesLike as Arrayish,
  BigNumber,
  BigNumberish,
} from 'ethers';
import { EthersContractContextV5 } from 'ethereum-abi-types-generator';

export type ContractContext = EthersContractContextV5<
  Transactions,
  TransactionsMethodNames,
  TransactionsEventsContext,
  TransactionsEvents
>;

export declare type EventFilter = {
  address?: string;
  topics?: Array<string>;
  fromBlock?: string | number;
  toBlock?: string | number;
};

export interface ContractTransactionOverrides {
  /**
   * The maximum units of gas for the transaction to use
   */
  gasLimit?: number;
  /**
   * The price (in wei) per unit of gas
   */
  gasPrice?: BigNumber | string | number | Promise<any>;
  /**
   * The nonce to use in the transaction
   */
  nonce?: number;
  /**
   * The amount to send with the transaction (i.e. msg.value)
   */
  value?: BigNumber | string | number | Promise<any>;
  /**
   * The chain ID (or network ID) to use
   */
  chainId?: number;
}

export interface ContractCallOverrides {
  /**
   * The address to execute the call as
   */
  from?: string;
  /**
   * The maximum units of gas for the transaction to use
   */
  gasLimit?: number;
}
export type TransactionsEvents = 'Transfer';
export interface TransactionsEventsContext {
  Transfer(...parameters: any): EventFilter;
}
export type TransactionsMethodNames =
  | 'addToBlockchain'
  | 'getAllTransaction'
  | 'getTransactionCount';
export interface TransferEventEmittedResponse {
  from: string;
  reciever: string;
  amount: BigNumberish;
  message: string;
  keyword: string;
}
export interface TransferResponse {
  from: string;
  0: string;
  reciever: string;
  1: string;
  amount: BigNumber;
  2: BigNumber;
  message: string;
  3: string;
  keyword: string;
  4: string;
}
export interface Transactions {
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param reciever Type: address, Indexed: false
   * @param amount Type: uint256, Indexed: false
   * @param message Type: string, Indexed: false
   * @param keyword Type: string, Indexed: false
   */
  addToBlockchain(
    reciever: string,
    amount: BigNumberish,
    message: string,
    keyword: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getAllTransaction(
    overrides?: ContractCallOverrides
  ): Promise<TransferResponse[]>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getTransactionCount(overrides?: ContractCallOverrides): Promise<BigNumber>;
}
