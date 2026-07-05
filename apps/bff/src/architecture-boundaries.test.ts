import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

function getTsFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((entry: string): string[] => {
    const fullPath = join(dir, entry);

    if (statSync(fullPath).isDirectory()) {
      return getTsFiles(fullPath);
    }

    return fullPath.endsWith('.ts') ? [fullPath] : [];
  });
}

function readFile(filePath: string): string {
  return readFileSync(filePath, 'utf8');
}

function imports(filePath: string, pattern: RegExp): boolean {
  return pattern.test(readFile(filePath));
}

describe('architecture boundaries', () => {
  it('application use cases and ports must not import infra', () => {
    const files = getTsFiles('src/modules').filter(
      (file: string): boolean => file.includes('/application/') && !file.includes('/application/schemas/')
    );

    const offenders = files.filter((file: string): boolean => imports(file, /from ['"].*\/infra\//));

    expect(offenders).toEqual([]);
  });

  it('routes must not import infra directly', () => {
    const files = getTsFiles('src/routes').filter((file: string): boolean => !file.endsWith('.test.ts'));

    const offenders = files.filter((file: string): boolean => imports(file, /from ['"].*\/infra\//));

    expect(offenders).toEqual([]);
  });

  it('domain must not import application or infra', () => {
    const files = getTsFiles('src/modules').filter((file: string): boolean => file.includes('/domain/'));

    const offenders = files.filter((file: string): boolean => imports(file, /from ['"].*\/(application|infra)\//));

    expect(offenders).toEqual([]);
  });

  it('Zod must stay at runtime boundaries', () => {
    const allowedZodFiles = [
      '/application/schemas/',
      '/infra/',
      'src/shared/validation.ts'
    ];
    const files = getTsFiles('src').filter((file: string): boolean => imports(file, /from ['"]zod['"]/));

    const offenders = files.filter(
      (file: string): boolean => !allowedZodFiles.some((allowedPath: string): boolean => file.includes(allowedPath))
    );

    expect(offenders).toEqual([]);
  });
});
