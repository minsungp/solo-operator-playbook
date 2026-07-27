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
<nav><a href="${rel}index.html">Articles</a><a href="${rel}ko/index.html">한국어</a><a href="${FREE}" class="cta">Free sampler</a></nav></div></header>`;

const footer = (rel) => `<footer class="site"><div class="wrap"><div class="row">
<span>Written by a solo founder running a physical-product company with zero employees and a team of AI agents.</span></div>
<div class="row" style="margin-top:14px">
<a href="${rel}index.html">All articles</a><a href="${FREE}">Free 15-page sampler</a><a href="${PAID}">Full playbook ($19)</a><a href="https://zonebio5.gumroad.com/partner-with-me">Partner / affiliate (40%)</a></div></div></footer>`;

const ctaCardKo = `<div class="cta-card"><div class="eyebrow">전체 시스템</div>
<h3>1인 회사를 돌리는 30가지 워크플로우</h3>
<p>이 글은 워크플로우 하나를 다룹니다. 플레이북에는 30개 전부가 들어 있습니다 — 이커머스 운영, 재무·행정, 마케팅, 세일즈, 개발·인프라, 그리고 시스템을 지탱하는 메타 워크플로우까지. 각각 복사해서 쓰는 프롬프트, 실패 사례, 정직한 효과 범위 포함. 75페이지.</p>
<div class="btnrow"><a class="btn" href="https://zonebio5.gumroad.com/l/solo-operator-free-sampler-ko">무료로 5개 받기</a><a class="btn ghost" href="https://zonebio5.gumroad.com/l/solo-operator-ai-playbook-ko">전체 플레이북 — $15</a></div>
<p class="fine" style="margin-top:14px">무료 샘플러는 이메일 요구 없음. 30일 환불 보장.</p></div>`;

const ctaCard = `<div class="cta-card"><div class="eyebrow">The full system</div>
<h3>30 workflows that run a one-person company</h3>
<p>This article covers one workflow. The playbook has all 30 — e-commerce ops, finance, marketing, sales, dev &amp; infra, plus the meta-workflows that keep it honest. Each with a copy-paste prompt, the failures, and honest impact ranges. 75 designed pages.</p>
<div class="btnrow"><a class="btn" href="${FREE}">Get 5 workflows free</a><a class="btn ghost" href="${PAID}">Full playbook — $19</a></div>
<p class="fine" style="margin-top:14px">No email gate on the free sampler. 30-day money-back guarantee on the book.</p></div>`;

function shell({ title, desc, body, rel, canonical, jsonld, ogType='article', lang='en' }) {
  return `<!DOCTYPE html><html lang="${lang}"><head><meta charset="utf-8">
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

function buildCollection(srcDir, opts) {
const files = fs.existsSync(srcDir) ? fs.readdirSync(srcDir).filter(f => f.endsWith('.md')) : [];
const posts = [];
for (const f of files) {
  const raw = fs.readFileSync(path.join(srcDir, f), 'utf8');
  const { meta, md } = parseFront(raw);
  const slug = meta.slug || f.replace(/\.md$/, '');
  const html = enhance(marked.parse(md));
  const canonical = `${SITE}${opts.prefix}/${slug}.html`;
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
${html}${opts.cta}</article></div>`;
  fs.mkdirSync(path.join(OUT, opts.dir), { recursive: true });
  fs.writeFileSync(path.join(OUT, opts.dir, `${slug}.html`), shell({ title: `${meta.title} — ${opts.brand}`, desc: meta.description, body, rel: opts.rel, canonical, jsonld, lang: opts.lang }));
  posts.push({ slug, ...meta });
}

posts.sort((a, b) => (a.order || 99) - (b.order || 99));
return posts;
}

const posts = buildCollection(path.join(ROOT, 'articles'), { prefix:'', dir:'.', rel:'', cta:ctaCard, brand:'The Solo Operator', lang:'en' });
const postsKo = buildCollection(path.join(ROOT, 'articles-ko'), { prefix:'/ko', dir:'ko', rel:'../', cta:ctaCardKo, brand:'The Solo Operator', lang:'ko' });

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


if (postsKo.length) {
  const koBody = `<div class="wrap"><section class="hero">
<div class="eyebrow">1인 · 직원 0명 · AI 에이전트</div>
<h1>직원 없이 회사를 <em>혼자</em> 돌리는 방법.</h1>
<p class="lede">실물 재고, 두 개의 스토어, 정기결제, 장부, 세무 신고, 정부지원사업, 프로덕션 배포까지. 직원은 0명입니다. 실제로 돌리는 워크플로우를 실패 사례까지 그대로 적었습니다.</p>
<div class="btnrow"><a class="btn" href="https://zonebio5.gumroad.com/l/solo-operator-free-sampler-ko">무료로 5개 받기</a><a class="btn ghost" href="https://zonebio5.gumroad.com/l/solo-operator-ai-playbook-ko">전체 플레이북 — $15</a></div>
<div class="stats"><div><span class="n">30</span><span class="l">워크플로우</span></div><div><span class="n">0</span><span class="l">직원</span></div><div><span class="n">75</span><span class="l">페이지</span></div></div>
</section>
<section class="list"><h2>글</h2>
${postsKo.map(p => `<a class="post" href="${p.slug}.html"><div class="meta">${p.kicker || ''} · ${p.date}</div><h3>${p.title}</h3><p>${p.description}</p></a>`).join('\n')}
</section></div>`;
  fs.writeFileSync(path.join(OUT, 'ko', 'index.html'), shell({
    title: '1인 사업가의 AI 자동화 — 직원 없이 회사 돌리는 워크플로우',
    desc: '직원 0명으로 실물 제품 회사를 운영하는 1인 창업자의 실제 AI 에이전트 워크플로우 — 이커머스 운영, 재무, 마케팅, 세일즈, 개발.',
    body: koBody, rel: '../', canonical: `${SITE}/ko/`, ogType: 'website', lang: 'ko',
    jsonld: { '@context':'https://schema.org', '@type':'Blog', name:'The Solo Operator (한국어)', url:`${SITE}/ko/` },
  }));
}

fs.writeFileSync(path.join(OUT, 'index.html'), shell({
  title: 'The Solo Operator — running a company with zero employees and AI agents',
  desc: 'Real AI-agent workflows from a solo founder running a physical-product company with no employees: e-commerce ops, finance, marketing, sales, and production code.',
  body: indexBody, rel: '', canonical: `${SITE}/`, ogType: 'website',
  jsonld: { '@context':'https://schema.org', '@type':'Blog', name:'The Solo Operator', url:`${SITE}/` },
}));

const urls = [`${SITE}/`, ...posts.map(p => `${SITE}/${p.slug}.html`), `${SITE}/ko/`, ...postsKo.map(p => `${SITE}/ko/${p.slug}.html`)];
fs.writeFileSync(path.join(OUT, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(u => `<url><loc>${u}</loc></url>`).join('\n')}\n</urlset>`);
fs.writeFileSync(path.join(OUT, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${SITE}/sitemap.xml\n`);
fs.writeFileSync(path.join(OUT, '.nojekyll'), '');

console.log(`built ${posts.length} EN + ${postsKo.length} KO articles →`, OUT);
posts.forEach(p => console.log(' -', p.slug, '|', p.title));
