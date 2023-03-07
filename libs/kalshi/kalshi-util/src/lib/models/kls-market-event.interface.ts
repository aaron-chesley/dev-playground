import { KlsMarket } from './kls-market.interface';
import { SettlementSource } from './kls-settlement-source.interface';

export interface KlsMarketEvent {
  ticker: string;
  series_ticker: string;
  target_datetime: string;
  mutually_exclusive: boolean;
  mutually_exclusive_side: string;
  title: string;
  category: string;
  tags: string[];
  min_tick_size: string;
  settle_details: string;
  settlement_sources: SettlementSource[];
  description_context: string;
  underlying: string;
  metrics_tags: string[];
  mini_title: string;
  sub_title: string;
  markets: KlsMarket[];
}
