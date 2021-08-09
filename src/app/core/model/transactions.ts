export interface Transaction {
  date_creation: string;
  transaction_type: string;
  transaction_status: string;
  emitter: string;
  receiver: string;
  amount_raw: string;
  amount_net: string;
  fiat_currency: string;
  crypto_currency: string;
  crypto_amount: string;
}
