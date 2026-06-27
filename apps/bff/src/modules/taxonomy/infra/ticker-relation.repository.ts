import type { TickerRelation, TickerRelationType } from '../domain/ticker-relation.js';

export interface TickerRelationRepository {
  saveRelation(relation: TickerRelation): Promise<void>;
  findRelationsByTicker(ticker: string): Promise<TickerRelation[]>;
  findRelationsByType(ticker: string, type: TickerRelationType): Promise<TickerRelation[]>;
}

export class NotImplementedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NotImplementedError';
  }
}

export class PlaceholderTickerRelationRepository implements TickerRelationRepository {
  async saveRelation(_relation: TickerRelation): Promise<void> {
    throw new NotImplementedError('Ticker relation persistence is not implemented yet.');
  }

  async findRelationsByTicker(_ticker: string): Promise<TickerRelation[]> {
    throw new NotImplementedError('Ticker relation reads are not implemented yet.');
  }

  async findRelationsByType(_ticker: string, _type: TickerRelationType): Promise<TickerRelation[]> {
    throw new NotImplementedError('Ticker relation reads are not implemented yet.');
  }
}
