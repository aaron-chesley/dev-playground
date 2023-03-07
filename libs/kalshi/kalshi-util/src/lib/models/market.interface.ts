import { RulebookVariable } from './rulebook-variable.interface';

export interface Market {
  id: string;
  ticker_name: string;
  create_date: string;
  list_date: string;
  open_date: string;
  close_date: string;
  expiration_date: string;
  status: string;
  expiration_value: string;
  result: string;
  yes_bid: number;
  yes_ask: number;
  last_price: number;
  previous_yes_bid: number;
  previous_yes_ask: number;
  previous_price: number;
  volume: number;
  recent_volume: number;
  open_interest: number;
  liquidity: number; // Value for current offers in this market in cents.
  dollar_volume: number;
  dollar_recent_volume: number;
  dollar_open_interest: number;
  sub_title: string;
  title: string;
  mini_title: string;
  name: string;
  can_close_early: boolean;
  rulebook_variables: RulebookVariable;
  risk_limit_cents: number;
}
