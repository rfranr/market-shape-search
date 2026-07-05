import type { TickerRelation } from '../domain/ticker-relation.js';
import type { TickerRelationRepositoryPort } from './ports/ticker-relation-repository.port.js';

export class LinkTickersUseCase {
  constructor(private readonly tickerRelationRepository: TickerRelationRepositoryPort) {}

  async execute(relation: TickerRelation): Promise<void> {
    await this.tickerRelationRepository.saveRelation(relation);
  }
}
