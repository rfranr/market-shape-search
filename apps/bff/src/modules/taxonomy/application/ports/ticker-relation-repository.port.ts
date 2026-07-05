import type { TickerRelation, TickerRelationType } from '../../domain/ticker-relation.js';

export interface TickerRelationRepositoryPort {
  saveRelation(relation: TickerRelation): Promise<void>;
  findRelationsByTicker(ticker: string): Promise<TickerRelation[]>;
  findRelationsByType(ticker: string, type: TickerRelationType): Promise<TickerRelation[]>;
}
