import { marked } from 'marked';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.dirname(new URL(import.meta.url).pathname);
const SRC = path.join(ROOT, 'articles');
const OUT = path.join(ROOT, 'docs');
const SITE = 'https://methezone.github.io/solo-operator-playbook';
const PAID = 'https://zonebio5.gumroad.com/l/solo-operator-ai-playbook';
const FREE = 'https://zonebio5.gumroad.com/l/solo-operator-free-sampler';

const FONTS = `<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;1,8..60,400&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400&display=swap" rel="stylesheet">`;

const MARK = `<svg class="mark" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><g fill="#141413"><rect x="19" y="0" width="2" height="40"/><rect x="0" y="19" width="40" height="2"/><rect x="19" y="0" width="2" height="40" transform="rotate(45 20 20)"/><rect x="19" y="0" width="2" height="40" transform="rotate(-45 20 20)"/><rect x="19" y="0" width="2" height="40" transform="rotate(22.5 20 20)" opacity=".5"/><rect x="19" y="0" width="2" height="40" transform="rotate(-22.5 20 20)" opacity=".5"/><rect x="19" y="0" width="2" height="40" transform="rotate(67.5 20 20)" opacity=".5"/><rect x="19" y="0" width="2" height="40" transform="rotate(-67.5 20 20)" opacity=".5"/></g></svg>`;

const header = (rel) => `<header class="site"><div class="bar">${MARK}<span class="name">The Solo Operator</span>
<nav><a href="${rel}index.html">Articles</a><a href="${FREE}" class="cta">Free sampler</a></nav></div></header>`;

const footer = (rel) => `<footer class="site"><div class="wrap"><div class="row">
<span>Written by a solo founder running a physical-product company with zero employees and a team of AI agents.</span></div>
<div class="row" style="margin-top:14px">
<a href="${rel}index.html">All articles</a><a href="${FREE}">Free 15-page sampler</a><a href="${PAID}">Full playbook ($19)</a><a href="https://zonebio5.gumroad.com/partner-with-me">Partner / affiliate (40%)</a></div></div></footer>`;

const ctaCard = `<div class="cta-card"><div class="eyebrow">The full system</div>
<h3>30 workflows that run a one-person company</h3>
<p>This article covers one workflow. The playbook has all 30 — e-commerce ops, finance, marketing, sales, dev &amp; infra, plus the meta-workflows that keep it honest. Each with a copy-paste prompt, the failures, and honest impact ranges. 75 designed pages.</p>
<div class="btnrow"><a class="btn" href="${FREE}">Get 5 workflows free</a><a class="btn ghost" href="${PAID}">Full playbook — $19</a></div>
<p class="fine" style="margin-top:14px">No email gate on the free sampler. 30-day money-back guarantee on the book.</p></div>`;

function shell({ title, desc, body, rel, canonical, jsonld, ogType='article' }) {
  return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title}</title>
<meta name="description" content="${desc.replace(/"/g,'&quot;')}">
<link rel="canonical" href="${canonical}">
<meta property="og:type" content="${ogType}"><meta property="og:title" content="${title.replace(/"/g,'&quot;')}">
<meta property="og:description" content="${desc.replace(/"/g,'&quot;')}"><meta property="og:url" content="${canonical}">
<meta property="og:site_name" content="The Solo Operator"><meta name="twitter:card" content="summary_large_image">
${FONTS}<link rel="stylesheet" href="${rel}assets/style.css">
${jsonld ? `<script type="application/ld+json">${JSON.stringify(jsonld)}</script>` : ''}
</head><body>${header(rel)}${body}${footer(rel)}</body></html>`;
}

function parseFront(raw) {
  const m = /^---\n([\s\S]*?)\n---\n?/.exec(raw);
  if (!m) return { meta: {}, md: raw };
  const meta = {};
  for (const line of m[1].split('\n')) {
    const i = line.indexOf(':');
    if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim().replace(/^["']|["']$/g, '');
  }
  return { meta, md: raw.slice(m[0].length) };
}

// style prompt code blocks + callouts
function enhance(html) {
  html = html.replace(/<pre><code(?: class="[^"]*")?>([\s\S]*?)<\/code><\/pre>/g,
    (_m, code) => `<div class="prompt"><div class="bar"><i></i><i></i><i></i><b>Copy-paste prompt</b></div><pre><code>${code}</code></pre></div>`);
  html = html.replace(/<p>\s*\[!PITFALL\]([\s\S]*?)<\/p>/g, (_m, t) => `<div class="note pit"><div class="hd">Pitfall I hit</div><p>${t.trim()}</p></div>`);
  html = html.replace(/<p>\s*\[!IMPACT\]([\s\S]*?)<\/p>/g, (_m, t) => `<div class="note imp"><div class="hd">Impact</div><p>${t.trim()}</p></div>`);
  return html;
}

fs.mkdirSync(OUT, { recursive: true });
fs.mkdirSync(path.join(OUT, 'assets'), { recursive: true });
fs.copyFileSync(path.join(ROOT, 'assets', 'style.css'), path.join(OUT, 'assets', 'style.css'));

const files = fs.existsSync(SRC) ? fs.readdirSync(SRC).filter(f => f.endsWith('.md')) : [];
const posts = [];
for (const f of files) {
  const raw = fs.readFileSync(path.join(SRC, f), 'utf8');
  const { meta, md } = parseFront(raw);
  const slug = meta.slug || f.replace(/\.md$/, '');
  const html = enhance(marked.parse(md));
  const canonical = `${SITE}/${slug}.html`;
  const jsonld = {
    '@context': 'https://schema.org', '@type': 'Article',
    headline: meta.title, description: meta.description,
    datePublished: meta.date, author: { '@type': 'Person', name: 'The Solo Operator' },
    mainEntityOfPage: canonical,
  };
  const body = `<div class="wrap"><article class="post-body">
<div class="kicker">${meta.kicker || 'Workflow'}</div>
<h1>${meta.title}</h1>
<div class="byline">${meta.date} · ${meta.readingTime || '7 min read'}</div>
${html}${ctaCard}</article></div>`;
  fs.writeFileSync(path.join(OUT, `${slug}.html`), shell({ title: `${meta.title} — The Solo Operator`, desc: meta.description, body, rel: '', canonical, jsonld }));
  posts.push({ slug, ...meta });
}

posts.sort((a, b) => (a.order || 99) - (b.order || 99));

const indexBody = `<div class="wrap"><section class="hero">
<div class="eyebrow">One person · zero employees · AI agents</div>
<h1>How I run a real company <em>alone</em>, with agents doing the doing.</h1>
<p class="lede">Physical inventory, two storefronts, subscription billing, bookkeeping, tax filings, grant applications, production deploys. Headcount: one. These are the actual workflows — including the failures.</p>
<div class="btnrow"><a class="btn" href="${FREE}">Get 5 workflows free</a><a class="btn ghost" href="${PAID}">Full playbook — $19</a></div>
<div class="stats"><div><span class="n">30</span><span class="l">Workflows</span></div><div><span class="n">0</span><span class="l">Employees</span></div><div><span class="n">75</span><span class="l">Pages</span></div></div>
</section>
<section class="list"><h2>Articles</h2>
${posts.map(p => `<a class="post" href="${p.slug}.html"><div class="meta">${p.kicker || 'Workflow'} · ${p.date}</div><h3>${p.title}</h3><p>${p.description}</p></a>`).join('\n')}
</section></div>`;

fs.writeFileSync(path.join(OUT, 'index.html'), shell({
  title: 'The Solo Operator — running a company with zero employees and AI agents',
  desc: 'Real AI-agent workflows from a solo founder running a physical-product company with no employees: e-commerce ops, finance, marketing, sales, and production code.',
  body: indexBody, rel: '', canonical: `${SITE}/`, ogType: 'website',
  jsonld: { '@context':'https://schema.org', '@type':'Blog', name:'The Solo Operator', url:`${SITE}/` },
}));

const urls = [`${SITE}/`, ...posts.map(p => `${SITE}/${p.slug}.html`)];
fs.writeFileSync(path.join(OUT, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(u => `<url><loc>${u}</loc></url>`).join('\n')}\n</urlset>`);
fs.writeFileSync(path.join(OUT, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${SITE}/sitemap.xml\n`);
fs.writeFileSync(path.join(OUT, '.nojekyll'), '');

console.log(`built ${posts.length} articles →`, OUT);
posts.forEach(p => console.log(' -', p.slug, '|', p.title));
