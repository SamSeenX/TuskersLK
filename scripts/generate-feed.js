/**
 * RSS 2.0 Feed Generator
 * Emits public/feed.xml indexing all Sri Lankan tusker chronicles
 */
import fs from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { SITE_URL, SITE_NAME } from './site-config.js';
import { ELEPHANTS } from '../src/data/elephants.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = resolve(__dirname, '..');
const PUBLIC_DIR = resolve(ROOT_DIR, 'public');
const FEED_PATH = resolve(PUBLIC_DIR, 'feed.xml');

export function generateFeed() {
  const rssItems = ELEPHANTS.map((elephant) => `    <item>
      <title><![CDATA[${elephant.name} (${elephant.sinhalaName})]]></title>
      <link>${SITE_URL}/elephants/${elephant.id}.html</link>
      <guid>${SITE_URL}/elephants/${elephant.id}.html</guid>
      <description><![CDATA[${elephant.whyFamous} Roaming territory: ${elephant.locationName}. Status: ${elephant.status}. Physical traits: ${elephant.physicalTraits}.]]></description>
      <pubDate>${new Date('2026-10-23T00:00:00Z').toUTCString()}</pubDate>
    </item>`).join('\n');

  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${SITE_NAME} Feed</title>
    <link>${SITE_URL}</link>
    <description>Chronicles and conservation records of Sri Lanka's notable elephants and tuskers.</description>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${rssItems}
  </channel>
</rss>
`;

  if (!fs.existsSync(PUBLIC_DIR)) {
    fs.mkdirSync(PUBLIC_DIR, { recursive: true });
  }

  fs.writeFileSync(FEED_PATH, xmlContent, 'utf8');
  console.log(`[RSS Feed] Generated feed.xml with ${ELEPHANTS.length} tusker chronicles.`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  generateFeed();
}
