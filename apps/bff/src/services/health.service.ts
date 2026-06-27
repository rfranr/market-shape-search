import type { HelloResponse } from '@repo/shared-types';

export function getHelloResponse(): HelloResponse {
  return {
    message: 'HelloWorld des del BFF 👋',
    source: 'bff'
  };
}
