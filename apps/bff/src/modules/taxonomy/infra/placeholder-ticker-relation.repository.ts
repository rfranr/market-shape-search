import type { TickerRelationRepositoryPort } from '../application/ports/ticker-relation-repository.port.js';
import type { TickerRelation, TickerRelationType } from '../domain/ticker-relation.js';
import { NotImplementedError } from '../../../shared/errors.js';

export class PlaceholderTickerRelationRepository implements TickerRelationRepositoryPort {
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
