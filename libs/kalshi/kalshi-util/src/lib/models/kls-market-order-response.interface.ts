export interface MarketOrderResponse {
  order: {
    order_id: string;
    user_id: string;
    market_id: string;
    status: 'pending'; // Sus out the rest of the options
    is_yes: boolean;
    price: number;
    create_ts: string;
    expriation_ts: string | null;
    order_type: 'market' | 'limit'; // Check if 'market' is correct
    order_action: 'buy' | 'sell';
    user_side: 'yes' | 'no';
    taker_fill_count: number;
    taker_fill_cost: number;
    place_count: number;
    decrease_count: number;
    maker_fill_count: number;
    fcc_cancel_count: number;
    close_cancel_count: number;
    remaining_count: number;
    last_update_op: string;
    extra_cost: number;
    extra_count: number;
    queue_position: number;
    taker_fees: number;
  };
  status: string;
}
