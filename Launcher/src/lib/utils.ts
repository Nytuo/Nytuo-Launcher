import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function compareVersions(a: string | undefined, b: string | undefined) {
  if (!a || !b) return 0;
  const pa = a.split(/\.|-/).map((s) => parseInt(s || '0', 10));
  const pb = b.split(/\.|-/).map((s) => parseInt(s || '0', 10));
  const len = Math.max(pa.length, pb.length);
  for (let i = 0; i < len; i++) {
    const na = pa[i] || 0;
    const nb = pb[i] || 0;
    if (na > nb) return 1;
    if (na < nb) return -1;
  }
  return 0;
}
