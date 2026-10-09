export const POCKETBASE_URL = 'https://pocket.nytuo.fr';

export interface PocketRecord {
  id: string;
  collectionId: string;
  collectionName?: string;
  [key: string]: unknown;
}

function fileUrl(record: PocketRecord, file: string): string {
  return `${POCKETBASE_URL}/api/files/${record.collectionId}/${record.id}/${file}`;
}

export async function fetchPocketCollection<T extends PocketRecord>(
  collection: string,
  options?: { filter?: string },
): Promise<T[]> {
  try {
    const params = new URLSearchParams({ perPage: '200', sort: '-created' });
    if (options?.filter) params.set('filter', options.filter);
    const res = await fetch(`${POCKETBASE_URL}/api/collections/${collection}/records?${params}`);
    if (!res.ok) return [];
    const data = await res.json();
    return (data.items ?? []) as T[];
  } catch {
    return [];
  }
}

export function resolveFileUrl(record: PocketRecord, file?: string | null): string | undefined {
  if (!file) return undefined;
  return fileUrl(record, file);
}

export function resolveFileUrls(record: PocketRecord, files?: string[] | null): string[] {
  if (!files || files.length === 0) return [];
  return files.map((f) => fileUrl(record, f));
}

export interface PocketAuthor {
  name: string;
  role?: string;
  url?: string;
  avatar?: string;
}

export function parseAuthors(authors: unknown): PocketAuthor[] {
  if (!authors) return [];
  if (Array.isArray(authors)) return authors as PocketAuthor[];
  if (typeof authors === 'string') {
    try {
      const parsed = JSON.parse(authors);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
  return [];
}

export function colorsToGradient(colors?: string): string | undefined {
  if (!colors) return undefined;
  const stops = colors
    .split(',')
    .map((c) => c.trim())
    .filter(Boolean);
  if (stops.length === 0) return undefined;
  if (stops.length === 1) return `linear-gradient(135deg, ${stops[0]}, hsl(var(--muted)))`;
  return `linear-gradient(135deg, ${stops.join(', ')})`;
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
}
