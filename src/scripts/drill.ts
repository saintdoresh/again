import type { Miss, Rule } from '../data/drills';

function norm(value: string) {
  return value.toLowerCase().replace(/\s+/g, ' ').replace(/\s*([:;])\s*/g, '$1').trim();
}

export function fails(rule: Rule, raw: string) {
  if (rule.op === 'count') {
    const needle = rule.text.toLowerCase();
    const hay = raw.toLowerCase();
    let count = 0;
    let at = 0;
    while ((at = hay.indexOf(needle, at)) !== -1) {
      count += 1;
      at += needle.length;
    }
    return count < rule.min;
  }
  const text = norm(raw);
  const needle = norm(rule.text);
  if (rule.op === 'has') return !text.includes(needle);
  return text.includes(needle);
}

export function firstMiss(rules: Rule[], raw: string): { miss: Miss; later: number } | null {
  const failed = rules.filter((rule) => fails(rule, raw));
  const first = failed[0];
  if (!first) return null;
  return { miss: first.miss, later: failed.length - 1 };
}
