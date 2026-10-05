type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

/**
 * Best-effort limiter kept in memory. On serverless hosting each instance has its own counter,
 * so treat it as a speed bump and add Vercel's firewall rate limiting for a hard limit.
 */
export function allowRequest(key: string, limit = 5, windowMs = 10 * 60 * 1000): boolean {
  const now = Date.now();
  if (buckets.size > 500) {
    for (const [k, bucket] of buckets) if (bucket.resetAt <= now) buckets.delete(k);
  }
  const bucket = buckets.get(key);
  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  bucket.count += 1;
  return bucket.count <= limit;
}
