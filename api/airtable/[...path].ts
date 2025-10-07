import type { VercelRequest, VercelResponse } from '@vercel/node';

// Simple Airtable proxy to avoid exposing PAT in the browser.
// Requires env vars set in Vercel project:
// - AIRTABLE_API_KEY (PAT)
// - AIRTABLE_BASE_ID (Base ID)
// - ALLOWED_ORIGINS (comma-separated list, e.g., https://jackpot-05.github.io,https://jackpot-05.github.io/ciclo-del-carbonio)

const AIRTABLE_API = 'https://api.airtable.com';

function cors(res: VercelResponse, origin: string | undefined, allowed: string[]): void {
  const reqOrigin = origin || '';
  const isAllowed = allowed.length === 0 || allowed.includes(reqOrigin);
  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Allow-Origin', isAllowed ? reqOrigin : '');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.setHeader('Access-Control-Max-Age', '600');
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { method, headers, query } = req;
  const segs = (req.query.path as string[] | undefined) || [];
  const allowed = (process.env.ALLOWED_ORIGINS || '')
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);
  cors(res, headers.origin as string | undefined, allowed);

  if (method === 'OPTIONS') {
    return res.status(204).end();
  }

  const baseId = process.env.AIRTABLE_BASE_ID;
  const apiKey = process.env.AIRTABLE_API_KEY;
  if (!baseId || !apiKey) {
    return res.status(500).json({ error: 'Airtable proxy misconfigured' });
  }

  // Build target URL: allow forwarding starting from /v0/...
  const path = segs.join('/');
  const targetUrl = `${AIRTABLE_API}/${path}`;

  // Enforce that the baseId used matches configured one to prevent abuse
  if (!path.includes(`/v0/${baseId}`)) {
    return res.status(400).json({ error: 'Invalid base id' });
  }

  const upstreamHeaders: Record<string, string> = {
    'Authorization': `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
  };

  try {
    const resp = await fetch(targetUrl + (req.url?.includes('?') ? '?' + (req.url!.split('?')[1] || '') : ''), {
      method,
      headers: upstreamHeaders,
      body: ['GET', 'HEAD'].includes(method || '') ? undefined : JSON.stringify(req.body || {}),
    } as any);

    const text = await resp.text();
    // Pass-through status
    res.status(resp.status);
    try {
      res.setHeader('Content-Type', resp.headers.get('content-type') || 'application/json');
    } catch {}
    return res.send(text);
  } catch (e: any) {
    return res.status(502).json({ error: 'Upstream error', detail: String(e?.message || e) });
  }
}
