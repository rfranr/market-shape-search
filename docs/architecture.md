# Architecture boundaries

Keep the BFF explicit, not framework-heavy.

## Rules

- `routes/` may import application schemas, module composition exports and domain response types.
- `routes/` must not import concrete `infra/` clients or repositories.
- `application/` contains use cases and ports. Use cases must depend on ports, not concrete infra.
- `domain/` contains pure project models and must not import `application/` or `infra/`.
- `infra/` contains external APIs, DB adapters, provider-specific schemas and mappers.
- `*.composition.ts` is the place for hand-wired dependency assembly with `new ConcreteInfra(...)`.

## Zod and ACL

Zod is only for runtime boundaries:

- incoming HTTP request bodies,
- external API responses,
- later, DB rows if needed.

Do not add Zod schemas for every domain interface.

For third-party APIs, keep the anti-corruption layer inside `infra`:

```text
external raw response -> Zod schema -> mapper -> domain model
```

Example: Alpaca `t/o/h/l/c/v` fields are validated and mapped inside `modules/market-data/infra/alpaca/`; the use case only sees `PriceCandle[]`.

## Guardrails

`apps/bff/src/architecture-boundaries.test.ts` fails when common boundaries are crossed, for example:

- application importing infra,
- routes importing infra directly,
- domain importing application or infra,
- Zod used outside runtime boundary folders.
