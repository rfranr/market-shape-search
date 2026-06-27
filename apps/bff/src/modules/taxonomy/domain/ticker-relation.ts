export type TickerRelationType =
  | 'parent'
  | 'child'
  | 'sector'
  | 'industry'
  | 'theme'
  | 'peer'
  | 'supplier'
  | 'customer';

export interface TickerRelation {
  sourceTicker: string;
  targetTicker: string;
  type: TickerRelationType;
  label?: string;
}
