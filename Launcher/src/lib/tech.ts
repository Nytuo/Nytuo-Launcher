/** Parses the `icons` field (JSON `{ "icons": [...] }`) into a slug array. */
export function parseIcons(raw?: string): string[] {
  if (!raw) return [];
  try {
    return JSON.parse(raw).icons ?? [];
  } catch {
    return [];
  }
}

/** Turns a devicon slug (e.g. "csharp-plain") into a display name ("C♯"). */
export function tagParser(tag: string): string {
  let res = tag
    .toLowerCase()
    .split(' ')
    .map((word) => (word ? word[0].toUpperCase() + word.slice(1) : word))
    .join(' ');
  if (res.includes('sharp')) res = res.replace('sharp', '♯');
  else if (res.includes('Dotnetcore')) res = res.replace('Dotnetcore', '.NET Core');
  else if (res.includes('Nodejs')) res = res.replace('Nodejs', 'Node.JS');
  else if (res.includes('Unrealengine')) res = res.replace('Unrealengine', 'Unreal Engine');
  return res.split('-')[0].replace(/\d/g, '');
}

export interface ParsedFeature {
  name: string;
  description: string;
  image?: number;
}

/** Parses the `information` field (JSON array of feature blurbs). */
export function parseFeatures(raw?: string): ParsedFeature[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}
