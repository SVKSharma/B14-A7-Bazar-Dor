const API_BASE_URLS = [
  'https://api.api-store.workers.dev/api/bazardor',
  'https://api.abcz.workers.dev/api/bazardor',
];

export async function fetchBazaarApi<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const failures: string[] = [];

  for (const baseUrl of API_BASE_URLS) {
    try {
      const response = await fetch(`${baseUrl}${path}`, init);
      if (!response.ok) {
        failures.push(`${baseUrl}: HTTP ${response.status}`);
        continue;
      }

      return (await response.json()) as T;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown fetch error';
      failures.push(`${baseUrl}: ${message}`);
    }
  }

  throw new Error(`All bazaar API requests failed. ${failures.join('; ')}`);
}
