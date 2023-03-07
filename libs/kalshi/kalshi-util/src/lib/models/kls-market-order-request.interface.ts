/*
 *  Market Order Request
 *  POST https://trading-api.kalshi.com/v1/users/{userId}/orders
 *
 **/
export interface MarketOrderRequest {
  count: number;
  side: 'yes' | 'no';
  price: number; // in cents 1 through 99
  expiration_unix_ts: number; // if has expiration ///Double check this one
  max_cost_cents: number;
  sell_position_capped: boolean;
  market_id: string;
  order_action: 'buy' | 'sell';
  user_side: 'yes' | 'no';
  order_type: 'market' | 'limit'; // Check if 'market' is correct
}
