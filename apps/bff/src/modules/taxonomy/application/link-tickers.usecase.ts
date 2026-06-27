import type { TickerRelation } from '../domain/ticker-relation.js';
import type { TickerRelationRepository } from '../infra/ticker-relation.repository.js';

export class LinkTickersUseCase {
  constructor(private readonly tickerRelationRepository: TickerRelationRepository) {}

  async execute(relation: TickerRelation): Promise<void> {
    await this.tickerRelationRepository.saveRelation(relation);
  }
}
