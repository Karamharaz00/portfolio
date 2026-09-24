/* ══════════════════════════════════════════════════════════
   الموبايل — جهاز ثلاثي الأبعاد واقعي (Three.js)
   إطار تيتانيوم، إزاز أمامي بيعكس الإضاءة، زراير جانبية،
   وعلى الشاشة: بروفايلك وتصاميمك كفيد حقيقي بيسكرول لوحده.
   لما الزائر يوصل لمشروع، الشاشة بتقلب لفيد المشروع ده.

   المصدر ده بيتبني لملف واحد: cd tools && npm install && npm run build
   الناتج: assets/phone.js — وهو اللي الصفحة بتحمّله.
   ══════════════════════════════════════════════════════════ */
import {
  WebGLRenderer, Scene, PerspectiveCamera, Group, Mesh, Shape, ExtrudeGeometry, ShapeGeometry,
  MeshPhysicalMaterial, MeshBasicMaterial, CanvasTexture, SRGBColorSpace, ACESFilmicToneMapping,
  PMREMGenerator, RepeatWrapping, ClampToEdgeWrapping, AdditiveBlending,
} from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';

const KH = window.KH;
const wrap = document.getElementById('phoneWrap');
const canvas = document.getElementById('phoneCanvas');
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const smooth = (a, b, v) => { const x = clamp((v - a) / (b - a)); return x * x * (3 - 2 * x); };
const damp = (a, b, rate, dt) => a + (b - a) * (1 - Math.exp(-rate * dt));

/* ══════════ مقاسات الجهاز (بالمتر تقريبًا — نفس نسب آيفون برو) ══════════ */
const W = .72, H = 1.48, D = .082, R = .118, B = .013, BZ = .026;
const SW = W - BZ * 2, SH = H - BZ * 2, SR = R - BZ;

if (KH && wrap && canvas) start();

function start() {
  const MOBILE = matchMedia('(max-width: 760px)').matches;
  const RM = !!KH.rm;

  /* ---------- الشاشة: رسم واجهة الفيد على كانفاس ---------- */
  const CW = MOBILE ? 560 : 720;
  const CH = Math.round(CW * SH / SW);
  const S = CW / 390;
  const P = v => Math.round(v * S);
  const COL = { text: '#f5f5f5', sub: '#a8a8a8', line: '#262626', btn: '#2c2c2e', accent: '#ff5a1f' };
  const FL = '"Space Grotesk","IBM Plex Sans Arabic",system-ui,sans-serif';
  const FA = '"IBM Plex Sans Arabic","Space Grotesk",system-ui,sans-serif';
  const font = (w, pt, ar) => `${w} ${P(pt)}px ${ar ? FA : FL}`;
  const isAr = s => /[؀-ۿ]/.test(s);

  const IMG = new Map();
  const VIEWS = new Map(), redrawT = new Map();
  let onImg = key => redraw(key);        /* لما صورة تتحمّل: نعيد رسم الشاشة اللي محتاجاها */
  function img(src, onload) {
    let e = IMG.get(src);
    if (!e) {
      e = { el: new Image(), ok: false, cbs: [] };
      e.el.decoding = 'async';
      e.el.onload = () => { e.ok = true; e.cbs.splice(0).forEach(f => f()); };
      e.el.src = src; IMG.set(src, e);
    }
    if (!e.ok && onload) e.cbs.push(onload);
    return e;
  }

  function rr(g, x, y, w, h, r) {
    g.beginPath(); g.moveTo(x + r, y); g.arcTo(x + w, y, x + w, y + h, r); g.arcTo(x + w, y + h, x, y + h, r);
    g.arcTo(x, y + h, x, y, r); g.arcTo(x, y, x + w, y, r); g.closePath();
  }
  function cover(g, e, x, y, w, h, fallback) {
    if (!e || !e.ok) { g.fillStyle = fallback || '#1a1a1c'; g.fillRect(x, y, w, h); return; }
    const im = e.el, s = Math.max(w / im.naturalWidth, h / im.naturalHeight);
    const sw = w / s, sh = h / s;
    g.drawImage(im, (im.naturalWidth - sw) / 2, (im.naturalHeight - sh) / 2, sw, sh, x, y, w, h);
  }
  function circleImg(g, e, cx, cy, r, fallback) {
    g.save(); g.beginPath(); g.arc(cx, cy, r, 0, Math.PI * 2); g.clip();
    cover(g, e, cx - r, cy - r, r * 2, r * 2, fallback); g.restore();
  }
  /* نص بيراعي الاتجاه: x بيتقاس من بداية السطر (شمال في الإنجليزي، يمين في العربي) */
  function txt(g, s, x, y, o = {}) {
    const rtl = o.rtl, ar = o.ar != null ? o.ar : isAr(s);
    g.font = font(o.w || 400, o.pt || 13, ar); g.fillStyle = o.c || COL.text; g.textBaseline = o.base || 'alphabetic';
    g.direction = ar ? 'rtl' : 'ltr';
    const al = o.align || 'start';
    if (al === 'center') { g.textAlign = 'center'; g.fillText(s, x, y); return; }
    const atRight = (al === 'start') === !!rtl;
    g.textAlign = atRight ? 'right' : 'left';
    g.fillText(s, atRight ? CW - x : x, y);
  }
  /* سطرين: الأول أقصر (جنبه اسم البراند)، والتاني بياخد "…" لو الكلام أطول */
  function wrap2(g, s, w1, w2) {
    const words = s.split(/\s+/); let l1 = '', i = 0;
    for (; i < words.length; i++) { const t = l1 ? l1 + ' ' + words[i] : words[i]; if (g.measureText(t).width > w1 && l1) break; l1 = t; }
    let l2 = '', j = i;
    for (; j < words.length; j++) { const t = l2 ? l2 + ' ' + words[j] : words[j]; if (g.measureText(t).width > w2 && l2) break; l2 = t; }
    if (j < words.length) { while (l2 && g.measureText(l2 + '…').width > w2) l2 = l2.replace(/\s*\S+$/, ''); l2 = l2.replace(/[\s،,.]+$/, '') + '…'; }
    return [l1, l2];
  }
  function wrapLines(g, s, maxW, maxLines) {
    const words = s.split(/\s+/); const lines = []; let cur = '';
    for (const w of words) {
      const t = cur ? cur + ' ' + w : w;
      if (g.measureText(t).width > maxW && cur) { lines.push(cur); cur = w; if (lines.length === maxLines) break; }
      else cur = t;
    }
    if (lines.length < maxLines && cur) lines.push(cur);
    if (lines.length === maxLines && words.join(' ').length > lines.join(' ').length) {
      let l = lines[maxLines - 1]; while (g.measureText(l + '…').width > maxW && l.length) l = l.slice(0, -1);
      lines[maxLines - 1] = l.replace(/[\s،,.]+$/, '') + '…';
    }
    return lines;
  }

  /* ---------- الأيقونات ---------- */
  function icon(g, k, cx, cy, s, o = {}) {
    g.save(); g.translate(cx, cy); if (o.flip) g.scale(-1, 1);
    g.strokeStyle = o.c || COL.text; g.fillStyle = o.c || COL.text;
    g.lineWidth = Math.max(1.5, s * .085); g.lineCap = 'round'; g.lineJoin = 'round';
    const h = s / 2;
    g.beginPath();
    switch (k) {
      case 'home':
        g.moveTo(-h * .8, -h * .05); g.lineTo(0, -h * .82); g.lineTo(h * .8, -h * .05); g.lineTo(h * .8, h * .82); g.lineTo(-h * .8, h * .82); g.closePath(); g.stroke(); break;
      case 'search':
        g.arc(-h * .12, -h * .12, h * .6, 0, Math.PI * 2); g.moveTo(h * .32, h * .32); g.lineTo(h * .82, h * .82); g.stroke(); break;
      case 'plus':
        rr(g, -h * .8, -h * .8, h * 1.6, h * 1.6, h * .45); g.stroke();
        g.beginPath(); g.moveTo(0, -h * .38); g.lineTo(0, h * .38); g.moveTo(-h * .38, 0); g.lineTo(h * .38, 0); g.stroke(); break;
      case 'reels':
        rr(g, -h * .8, -h * .8, h * 1.6, h * 1.6, h * .45); g.stroke();
        g.beginPath(); g.moveTo(-h * .8, -h * .35); g.lineTo(h * .8, -h * .35); g.stroke();
        g.beginPath(); g.moveTo(-h * .15, -h * .02); g.lineTo(h * .3, h * .3); g.lineTo(-h * .15, h * .6); g.closePath(); g.fill(); break;
      case 'heart':
        g.moveTo(0, h * .78);
        g.bezierCurveTo(-h * 1.05, h * .05, -h * .75, -h * .95, 0, -h * .4);
        g.bezierCurveTo(h * .75, -h * .95, h * 1.05, h * .05, 0, h * .78); g.stroke(); break;
      case 'comment':
        g.arc(0, 0, h * .8, Math.PI * .72, Math.PI * .72 + Math.PI * 1.86); g.lineTo(-h * .82, h * .82); g.closePath(); g.stroke(); break;
      case 'send':
        g.moveTo(-h * .85, -h * .7); g.lineTo(h * .85, -h * .7); g.lineTo(-h * .1, h * .85); g.lineTo(-h * .28, -h * .05); g.closePath();
        g.moveTo(-h * .28, -h * .05); g.lineTo(h * .85, -h * .7); g.stroke(); break;
      case 'save':
        g.moveTo(-h * .6, -h * .8); g.lineTo(h * .6, -h * .8); g.lineTo(h * .6, h * .85); g.lineTo(0, h * .3); g.lineTo(-h * .6, h * .85); g.closePath(); g.stroke(); break;
      case 'grid':
        for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) { g.rect(-h * .8 + i * h * .56, -h * .8 + j * h * .56, h * .46, h * .46); }
        g.fill(); break;
      case 'tag':
        rr(g, -h * .8, -h * .8, h * 1.6, h * 1.6, h * .3); g.stroke();
        g.beginPath(); g.arc(0, -h * .15, h * .28, 0, Math.PI * 2); g.stroke();
        g.beginPath(); g.moveTo(-h * .5, h * .62); g.quadraticCurveTo(0, h * .05, h * .5, h * .62); g.stroke(); break;
      case 'dots':
        [-1, 0, 1].forEach(i => { g.moveTo(i * h * .55 + h * .12, 0); g.arc(i * h * .55, 0, h * .12, 0, Math.PI * 2); }); g.fill(); break;
      case 'menu':
        [-.55, 0, .55].forEach(y => { g.moveTo(-h * .78, y * h); g.lineTo(h * .78, y * h); }); g.stroke(); break;
      case 'back':
        g.moveTo(h * .3, -h * .7); g.lineTo(-h * .35, 0); g.lineTo(h * .3, h * .7); g.stroke(); break;
      case 'chev':
        g.moveTo(-h * .45, -h * .2); g.lineTo(0, h * .25); g.lineTo(h * .45, -h * .2); g.stroke(); break;
      case 'person':
        g.arc(0, -h * .28, h * .34, 0, Math.PI * 2); g.stroke();
        g.beginPath(); g.moveTo(-h * .75, h * .8); g.quadraticCurveTo(-h * .7, h * .12, 0, h * .12); g.quadraticCurveTo(h * .7, h * .12, h * .75, h * .8); g.stroke(); break;
      case 'multi':
        g.lineWidth = Math.max(1.4, s * .09);
        rr(g, -h * .5, -h * .8, h * 1.3, h * 1.3, h * .2); g.stroke();
        g.beginPath(); rr(g, -h * .8, -h * .5, h * 1.3, h * 1.3, h * .2); g.fill(); break;
    }
    g.restore();
  }

  /* ---------- شريط الحالة + الجزيرة ---------- */
  function statusBar(g) {
    g.fillStyle = '#000'; g.fillRect(0, 0, CW, P(47));
    g.fillStyle = COL.text; g.font = font(600, 16.5, false); g.textBaseline = 'middle'; g.textAlign = 'center'; g.direction = 'ltr';
    g.fillText('9:41', P(55), P(29));
    const iw = P(122), ih = P(35), ix = (CW - iw) / 2, iy = P(11);
    g.fillStyle = '#060607'; rr(g, ix, iy, iw, ih, ih / 2); g.fill();
    g.fillStyle = '#12141a'; g.beginPath(); g.arc(ix + iw - ih / 2, iy + ih / 2, P(6), 0, Math.PI * 2); g.fill();
    g.fillStyle = 'rgba(70,95,160,.5)'; g.beginPath(); g.arc(ix + iw - ih / 2 - P(1.6), iy + ih / 2 - P(1.6), P(1.8), 0, Math.PI * 2); g.fill();
    const cy = P(29);
    let x = CW - P(26);
    const bw = P(25), bh = P(12);
    g.strokeStyle = 'rgba(245,245,245,.45)'; g.lineWidth = Math.max(1, P(1)); rr(g, x - bw, cy - bh / 2, bw, bh, P(3.6)); g.stroke();
    g.fillStyle = COL.text; rr(g, x - bw + P(2), cy - bh / 2 + P(2), (bw - P(4)) * .82, bh - P(4), P(2)); g.fill();
    g.fillStyle = 'rgba(245,245,245,.45)'; rr(g, x + P(1.2), cy - P(2.2), P(1.6), P(4.4), P(.8)); g.fill();
    x -= bw + P(8);
    g.strokeStyle = COL.text; g.lineWidth = P(1.9); g.lineCap = 'round';
    const wx = x - P(8), wy = cy + P(5);
    [P(3.6), P(7.4), P(11.2)].forEach(r => { g.beginPath(); g.arc(wx, wy, r, -Math.PI * .76, -Math.PI * .24); g.stroke(); });
    x -= P(24);
    for (let i = 0; i < 4; i++) { const bh2 = P(4 + i * 2.6); g.fillStyle = COL.text; rr(g, x - P(17) + i * P(4.6), cy + P(5.5) - bh2, P(3), bh2, P(1)); g.fill(); }
  }
  /* ---------- شريط التابات تحت ---------- */
  function tabBar(g, rtl, avatar) {
    const top = CH - P(83);
    g.fillStyle = '#000'; g.fillRect(0, top, CW, CH - top);
    g.fillStyle = COL.line; g.fillRect(0, top, CW, Math.max(1, P(.5)));
    ['home', 'search', 'plus', 'reels', 'me'].forEach((k, i) => {
      const slot = rtl ? 4 - i : i;
      const cx = CW * (slot + .5) / 5, cy = top + P(25);
      if (k === 'me') {
        g.strokeStyle = COL.text; g.lineWidth = P(1.6);
        g.beginPath(); g.arc(cx, cy, P(13), 0, Math.PI * 2); g.stroke();
        circleImg(g, avatar, cx, cy, P(11));
      } else icon(g, k, cx, cy, P(25), { flip: rtl && (k === 'search') });
    });
    g.fillStyle = COL.text; rr(g, (CW - P(134)) / 2, CH - P(13), P(134), P(5), P(2.5)); g.fill();
  }

  /* ══════════ حالة 0: بروفايلك ══════════ */
  const GRID_TOP = P(398);
  function profileUI(g, L, rtl) {
    g.clearRect(0, 0, CW, CH);
    const avatar = img('karam.jpg', () => onImg('me'));
    g.fillStyle = '#000'; g.fillRect(0, 0, CW, GRID_TOP);
    statusBar(g);
    const ar = L.ar;
    txt(g, 'karamharaaz', P(16), P(76), { w: 700, pt: 21, rtl, ar: false });
    g.font = font(700, 21, false);
    const uw = g.measureText('karamharaaz').width;
    icon(g, 'chev', rtl ? CW - P(16) - uw - P(14) : P(16) + uw + P(14), P(71), P(14));
    icon(g, 'menu', rtl ? P(28) : CW - P(28), P(70), P(24));
    icon(g, 'plus', rtl ? P(72) : CW - P(72), P(70), P(24));
    /* الصورة بحلقة الستوري */
    const AX = P(16), AY = P(104), AS = P(88), cx = rtl ? CW - AX - AS / 2 : AX + AS / 2, cy = AY + AS / 2;
    const gr = g.createLinearGradient(cx - AS / 2, cy + AS / 2, cx + AS / 2, cy - AS / 2);
    gr.addColorStop(0, '#feda75'); gr.addColorStop(.35, '#fa7e1e'); gr.addColorStop(.7, '#d62976'); gr.addColorStop(1, '#962fbf');
    g.strokeStyle = gr; g.lineWidth = P(3); g.beginPath(); g.arc(cx, cy, AS / 2 - P(1.5), 0, Math.PI * 2); g.stroke();
    circleImg(g, avatar, cx, cy, AS / 2 - P(6), '#3a2a22');
    /* الأرقام */
    const sx0 = AX + AS + P(22), sw = CW - sx0 - P(16);
    L.stats.forEach((st, i) => {
      const colC = sx0 + sw * (i + .5) / 3;
      const x = rtl ? CW - colC : colC;
      txt(g, st[0], x, P(143), { w: 700, pt: 17, align: 'center', ar });
      txt(g, st[1], x, P(163), { w: 400, pt: 13, align: 'center', ar, c: COL.text });
    });
    /* الاسم والبايو */
    txt(g, L.name, P(16), P(216), { w: 600, pt: 13.5, rtl, ar });
    txt(g, L.cat, P(16), P(235), { w: 400, pt: 13, rtl, ar, c: COL.sub });
    txt(g, L.bio1, P(16), P(254), { w: 400, pt: 13, rtl, ar });
    txt(g, L.bio2, P(16), P(273), { w: 400, pt: 13, rtl, ar });
    txt(g, 'karamharaz.online', P(16), P(292), { w: 500, pt: 13, rtl, ar: false, c: '#e0f1ff' });
    /* الزراير */
    const by = P(306), bh = P(33), gap = P(7), bw2 = (CW - P(32) - gap * 2 - P(34)) / 2;
    const bx = i => rtl ? CW - P(16) - bw2 * (i + 1) - gap * i : P(16) + (bw2 + gap) * i;
    g.fillStyle = COL.accent; rr(g, bx(0), by, bw2, bh, P(8)); g.fill();
    g.fillStyle = COL.btn; rr(g, bx(1), by, bw2, bh, P(8)); g.fill();
    txt(g, L.btn[0], bx(0) + bw2 / 2, by + bh / 2 + P(1), { w: 600, pt: 14, align: 'center', ar, base: 'middle', c: '#fff' });
    txt(g, L.btn[1], bx(1) + bw2 / 2, by + bh / 2 + P(1), { w: 600, pt: 14, align: 'center', ar, base: 'middle' });
    const px3 = rtl ? P(16) : CW - P(16) - P(34);
    g.fillStyle = COL.btn; rr(g, px3, by, P(34), bh, P(8)); g.fill();
    icon(g, 'person', px3 + P(17), by + bh / 2, P(17));
    /* تابات البروفايل */
    const ty = P(356);
    ['grid', 'reels', 'tag'].forEach((k, i) => {
      const slot = rtl ? 2 - i : i, cx2 = CW * (slot + .5) / 3;
      icon(g, k, cx2, ty + P(20), P(i === 0 ? 20 : 22), { c: i === 0 ? COL.text : COL.sub });
    });
    g.fillStyle = COL.line; g.fillRect(0, GRID_TOP - Math.max(1, P(.5)), CW, Math.max(1, P(.5)));
    const aslot = rtl ? 2 : 0;
    g.fillStyle = COL.text; g.fillRect(CW * aslot / 3, GRID_TOP - P(1.5), CW / 3, P(1.5));
    tabBar(g, rtl, avatar);
  }
  function profileFeed(g, rtl) {
    const gap = Math.max(2, P(1.3)), cw = (CW - gap * 2) / 3, ch = cw * 4 / 3;
    const list = [];
    for (let n = 1; n <= 2; n++) KH.projects.forEach(p => { if (list.length < 24 && n <= p.cnt) list.push({ p, n }); });
    const rows = Math.ceil(list.length / 3);
    const Hf = Math.round(rows * (ch + gap));
    g.canvas.height = Hf; g.fillStyle = '#000'; g.fillRect(0, 0, CW, Hf);
    list.forEach(({ p, n }, i) => {
      const c = rtl ? 2 - (i % 3) : i % 3, r = Math.floor(i / 3);
      const x = c * (cw + gap), y = r * (ch + gap);
      cover(g, img(`thumb/${p.id}/${n}.jpg`, () => onImg('me')), x, y, cw, ch, p.color + '55');
      if (i % 4 === 1) icon(g, 'multi', rtl ? x + P(14) : x + cw - P(14), y + P(14), P(16), { c: '#fff' });
    });
    return Hf;
  }

  /* ══════════ حالة المشروع: فيد البراند ══════════ */
  const FEED_TOP = P(92);
  function projectUI(g, p, L, rtl) {
    g.clearRect(0, 0, CW, CH);
    g.fillStyle = '#000'; g.fillRect(0, 0, CW, FEED_TOP);
    statusBar(g);
    icon(g, 'back', rtl ? CW - P(22) : P(22), P(70), P(22), { flip: rtl });
    txt(g, L.posts, CW / 2, P(62), { w: 400, pt: 12, align: 'center', ar: L.ar, c: COL.sub });
    txt(g, p.n, CW / 2, P(81), { w: 700, pt: 16, align: 'center', ar: false });
    g.fillStyle = COL.line; g.fillRect(0, FEED_TOP - Math.max(1, P(.5)), CW, Math.max(1, P(.5)));
    tabBar(g, rtl, img('karam.jpg', () => onImg(viewKey(p))));
  }
  function projectFeed(g, p, L, rtl) {
    const ar = L.ar;
    const cap = (ar ? p.dAr : p.dEn).replace(/\s*—\s*/g, ar ? '، ' : ', ');
    const ads = /^Advertising/.test(p.cEn);
    const sub = ads ? L.ad : (ar ? p.cAr : p.cEn).split(/\s*—\s*/).pop();
    const posts = [1, 2, 3].filter(n => n <= p.cnt);
    const imgH = Math.min(CW * 1.34, Math.round(CW * p.h / p.w));
    const block = P(54) + imgH + P(46) + P(46) + P(14);
    const Hf = block * posts.length;
    g.canvas.height = Hf; g.fillStyle = '#000'; g.fillRect(0, 0, CW, Hf);
    posts.forEach((n, i) => {
      let y = i * block;
      /* رأس البوست */
      const ax = P(12) + P(16), acx = rtl ? CW - ax : ax, acy = y + P(27);
      g.fillStyle = p.color; g.beginPath(); g.arc(acx, acy, P(16), 0, Math.PI * 2); g.fill();
      txt(g, p.n.charAt(0), acx, acy + P(1), { w: 700, pt: 14, align: 'center', ar: false, base: 'middle', c: '#fff' });
      txt(g, p.n, P(54), y + P(24), { w: 600, pt: 13.5, rtl, ar: false });
      txt(g, sub, P(54), y + P(41), { w: 400, pt: 11.5, rtl, ar, c: COL.sub });
      icon(g, 'dots', rtl ? P(22) : CW - P(22), acy, P(18));
      y += P(54);
      cover(g, img(`projects/${p.id}/${n}.jpg`, () => onImg(viewKey(p))), 0, y, CW, imgH, p.color + '44');
      y += imgH;
      /* الأكشنز */
      const icy = y + P(23);
      ['heart', 'comment', 'send'].forEach((k, j) => {
        const x = P(14) + P(12) + j * P(40);
        icon(g, k, rtl ? CW - x : x, icy, P(24), { flip: rtl && k === 'send' });
      });
      icon(g, 'save', rtl ? P(26) : CW - P(26), icy, P(24));
      /* نقط الكاروسيل */
      for (let d = 0; d < 3; d++) {
        g.fillStyle = d === 0 ? COL.accent : '#5c5c5c';
        g.beginPath(); g.arc(CW / 2 + (d - 1) * P(8), icy, P(2.6), 0, Math.PI * 2); g.fill();
      }
      y += P(46);
      /* الكابشن */
      g.font = font(600, 13, false);
      const nw = g.measureText(p.n).width + P(5);
      g.font = font(400, 13, ar);
      const [l1, l2] = wrap2(g, cap, CW - P(28) - nw, CW - P(28));
      txt(g, p.n, P(14), y + P(16), { w: 600, pt: 13, rtl, ar: false });
      txt(g, l1, P(14) + nw, y + P(16), { w: 400, pt: 13, rtl, ar });
      if (l2) txt(g, l2, P(14), y + P(35), { w: 400, pt: 13, rtl, ar });
    });
    return Hf;
  }

  /* ══════════ الـ 3D ══════════ */
  let renderer;
  try {
    renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
  } catch (e) {
    (document.fonts ? document.fonts.ready : Promise.resolve()).then(fallback); return;
  }
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, MOBILE ? 1.75 : 2));
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.setClearColor(0x000000, 0);

  const scene = new Scene();
  const pmrem = new PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), .04).texture;
  const camera = new PerspectiveCamera(24, 1, .1, 50);

  function rrShape(w, h, r) {
    const s = new Shape(), x = -w / 2, y = -h / 2;
    s.moveTo(x + r, y); s.lineTo(x + w - r, y); s.absarc(x + w - r, y + r, r, -Math.PI / 2, 0, false);
    s.lineTo(x + w, y + h - r); s.absarc(x + w - r, y + h - r, r, 0, Math.PI / 2, false);
    s.lineTo(x + r, y + h); s.absarc(x + r, y + h - r, r, Math.PI / 2, Math.PI, false);
    s.lineTo(x, y + r); s.absarc(x + r, y + r, r, Math.PI, Math.PI * 1.5, false);
    return s;
  }

  /* الجسم: تيتانيوم على الجناب + إزاز أسود قدام وورا */
  /* الـenvMap لازم يتحط صريح على الخامة، غير كده three.js بيتجاهل envMapIntensity ويستخدم شدة المشهد */
  const ENV = scene.environment;
  const titanium = new MeshPhysicalMaterial({ color: 0xbfae9c, metalness: 1, roughness: .27, envMap: ENV, envMapIntensity: 1.15 });
  const glass = new MeshPhysicalMaterial({ color: 0x050506, metalness: 0, roughness: .06, clearcoat: 1, clearcoatRoughness: .04 });
  const bodyGeo = new ExtrudeGeometry(rrShape(W - B * 2, H - B * 2, R - B), {
    depth: D - B * 2, bevelEnabled: true, bevelThickness: B, bevelSize: B, bevelSegments: 8, curveSegments: 56,
  });
  bodyGeo.translate(0, 0, -(D - B * 2) / 2);
  const phone = new Group();
  phone.add(new Mesh(bodyGeo, [glass, titanium]));

  /* الزراير الجانبية */
  const btn = (x, y, h) => {
    const m = new Mesh(new RoundedBoxGeometry(.016, h, .024, 3, .006), titanium);
    m.position.set(x, y, 0); phone.add(m);
  };
  btn(-W / 2 - .002, H / 2 - .27, .055); btn(-W / 2 - .002, H / 2 - .39, .1); btn(-W / 2 - .002, H / 2 - .52, .1);
  btn(W / 2 + .002, H / 2 - .43, .15);

  /* الشاشة */
  const screenGeo = new ShapeGeometry(rrShape(SW, SH, SR), 48);
  { const uv = screenGeo.attributes.uv, pos = screenGeo.attributes.position;
    for (let i = 0; i < uv.count; i++) uv.setXY(i, (pos.getX(i) + SW / 2) / SW, (pos.getY(i) + SH / 2) / SH); }
  const ZS = D / 2 + .0006;
  /* لمعة الإزاز: انعكاس حقيقي من الإضاءة + خط ضوء بيتحرك مع الزاوية */
  const glassTop = new Mesh(screenGeo, new MeshPhysicalMaterial({
    color: 0x000000, metalness: 0, roughness: .05, clearcoat: 1, clearcoatRoughness: .03,
    envMap: ENV, envMapIntensity: .045, /* انعكاس خفيف بس، عشان الشاشة متتغسلش لما الجهاز يبص قدام */
    transparent: true, blending: AdditiveBlending, depthWrite: false,
  }));
  glassTop.position.z = ZS + .0016; glassTop.renderOrder = 20; phone.add(glassTop);
  const glareTex = (() => {
    const c = document.createElement('canvas'); c.width = 256; c.height = 512;
    const g = c.getContext('2d');
    const lg = g.createLinearGradient(0, 0, 256, 512);
    lg.addColorStop(0, 'rgba(255,255,255,0)'); lg.addColorStop(.42, 'rgba(255,255,255,0)');
    lg.addColorStop(.5, 'rgba(255,255,255,.55)'); lg.addColorStop(.6, 'rgba(255,255,255,0)'); lg.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = lg; g.fillRect(0, 0, 256, 512);
    const t = new CanvasTexture(c); t.wrapS = t.wrapT = ClampToEdgeWrapping; return t;
  })();
  const glare = new Mesh(screenGeo, new MeshBasicMaterial({ map: glareTex, transparent: true, opacity: .07, blending: AdditiveBlending, depthWrite: false }));
  glare.position.z = ZS + .0018; glare.renderOrder = 21; phone.add(glare);

  const pivot = new Group(); pivot.add(phone); scene.add(pivot);

  /* ---------- الحالات (بروفايل / مشروع) ---------- */
  function viewKey(p) { return 'p:' + p.id; }
  function labels() {
    const ar = KH.lang() === 'ar';
    const nf = new Intl.NumberFormat(ar ? 'ar-EG' : 'en-US');
    return {
      ar,
      name: ar ? 'كرم حراز' : 'Karam Haraz',
      cat: ar ? 'مصمم جرافيك' : 'Graphic designer',
      bio1: ar ? 'تصميم سوشيال ميديا وإعلانات' : 'Social media & advertising design',
      bio2: ar ? 'القاهرة، لبراندات في السعودية والخليج ومصر' : 'Cairo · Brands in KSA, the Gulf & Egypt',
      stats: [[nf.format(850) + '+', ar ? 'تصميم' : 'designs'], [nf.format(45) + '+', ar ? 'براند' : 'brands'], [nf.format(5) + '+', ar ? 'سنين' : 'years']],
      btn: ar ? ['متابعة', 'مراسلة'] : ['Follow', 'Message'],
      posts: ar ? 'المنشورات' : 'Posts',
      ad: ar ? 'ممول' : 'Sponsored',
    };
  }

  let current = null, previous = null, fade = 1, fadeT0 = 0;
  function makeTex(c, repeat) {
    const t = new CanvasTexture(c); t.colorSpace = SRGBColorSpace;
    t.anisotropy = renderer.capabilities.getMaxAnisotropy();
    if (repeat) { t.wrapT = RepeatWrapping; t.wrapS = ClampToEdgeWrapping; }
    return t;
  }
  function buildView(key) {
    const rtl = KH.lang() === 'ar', L = labels();
    const p = key === 'me' ? null : KH.projects.find(x => viewKey(x) === key);
    const ui = document.createElement('canvas'); ui.width = CW; ui.height = CH;
    const fd = document.createElement('canvas'); fd.width = CW; fd.height = 16;
    const v = { key, p, ui, fd, s: 0, Hf: 1, top: p ? FEED_TOP : GRID_TOP, rtl };
    v.draw = () => {
      const gu = ui.getContext('2d'), gf = fd.getContext('2d');
      if (p) { projectUI(gu, p, L, rtl); v.Hf = projectFeed(gf, p, L, rtl); }
      else { profileUI(gu, L, rtl); v.Hf = profileFeed(gf, rtl); }
      if (!v.feedTex || v.texH !== v.Hf) {
        if (v.feedTex) v.feedTex.dispose();
        v.feedTex = makeTex(fd, true); v.texH = v.Hf;
        if (v.feedMesh) { v.feedMesh.material.map = v.feedTex; v.feedMesh.material.needsUpdate = true; }
      } else v.feedTex.needsUpdate = true;
      v.feedTex.repeat.set(1, CH / v.Hf);
      if (v.uiTex) v.uiTex.needsUpdate = true;
    };
    v.draw();
    v.uiTex = makeTex(ui, false);
    v.feedMesh = new Mesh(screenGeo, new MeshBasicMaterial({ map: v.feedTex, toneMapped: false, transparent: true, depthWrite: false }));
    v.uiMesh = new Mesh(screenGeo, new MeshBasicMaterial({ map: v.uiTex, toneMapped: false, transparent: true, depthWrite: false }));
    v.feedMesh.position.z = ZS; v.uiMesh.position.z = ZS + .0004;
    phone.add(v.feedMesh, v.uiMesh);
    VIEWS.set(key, v);
    return v;
  }
  function redraw(key) {
    /* الصور بتوصل واحدة ورا التانية: بنجمّع الرسم في فريم واحد */
    if (redrawT.has(key)) return;
    redrawT.set(key, requestAnimationFrame(() => { redrawT.delete(key); const v = VIEWS.get(key); if (v) v.draw(); }));
  }
  function disposeView(v) {
    phone.remove(v.feedMesh, v.uiMesh);
    v.feedTex.dispose(); v.uiTex.dispose(); v.feedMesh.material.dispose(); v.uiMesh.material.dispose();
    VIEWS.delete(v.key);
  }
  function show(key, instant) {
    if (current && current.key === key) return;
    if (previous) disposeView(previous);
    previous = current;
    current = VIEWS.get(key) || buildView(key);
    current.s = -P(60);            /* المحتوى الجديد بيطلع من تحت سنة */
    fade = instant || RM ? 1 : 0; fadeT0 = performance.now();
    kick += (Math.random() < .5 ? -1 : 1) * .16;
  }
  function stateKey(i) { return i <= 0 ? 'me' : viewKey(KH.projects[i - 1]); }
  addEventListener('kh:lang', () => {
    [...VIEWS.values()].forEach(disposeView); current = previous = null;
    show(stateKey(KH.stateIndex || 0), true);
  });

  /* ---------- المقاسات ---------- */
  function resize() {
    const w = wrap.clientWidth, h = wrap.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    const t = Math.tan(camera.fov * Math.PI / 360);
    const dH = (H * 1.22 / 2) / t, dW = (W * 1.9 / 2) / t / camera.aspect;
    camera.position.set(0, 0, Math.max(dH, dW));
    camera.updateProjectionMatrix();
  }
  new ResizeObserver(resize).observe(wrap);

  /* ---------- التفاعل: ميلان مع الماوس + سحب بالإيد ---------- */
  let mx = 0, my = 0, drag = 0, dragging = false, dx0 = 0, kick = 0;
  if (matchMedia('(hover:hover) and (pointer:fine)').matches) {
    addEventListener('pointermove', e => { mx = e.clientX / innerWidth - .5; my = e.clientY / innerHeight - .5; }, { passive: true });
  }
  canvas.addEventListener('pointerdown', e => { dragging = true; dx0 = e.clientX - drag / .006; canvas.setPointerCapture(e.pointerId); wrap.classList.add('grab'); });
  canvas.addEventListener('pointermove', e => { if (dragging) drag = clamp((e.clientX - dx0) * .006, -.95, .95); });
  const up = () => { dragging = false; wrap.classList.remove('grab'); };
  canvas.addEventListener('pointerup', up); canvas.addEventListener('pointercancel', up);

  /* ---------- اللوب ---------- */
  let visible = true, running = false, last = performance.now(), T0 = performance.now();
  const st = { ry: -.9, rx: .3, rz: 0, y: -.55 };
  new IntersectionObserver(es => { visible = es[0].isIntersecting; if (visible) run(); }).observe(wrap);
  document.addEventListener('visibilitychange', () => { if (!document.hidden) run(); });
  addEventListener('kh:route', () => { resize(); run(); });
  function run() { if (!running) { running = true; last = performance.now(); requestAnimationFrame(loop); } }

  let ready = false;
  function loop(now) {
    if (!ready || !visible || document.hidden || !KH.isHome()) { running = false; return; }
    requestAnimationFrame(loop);
    const dt = Math.min(.05, (now - last) / 1000); last = now;
    const t = (now - T0) / 1000;
    const rtl = document.documentElement.dir === 'rtl';

    const idx = KH.stateIndex || 0;
    const key = stateKey(idx);
    if (!current || current.key !== key) show(key);

    /* الزاوية المطلوبة للحالة الحالية */
    const side = rtl ? -1 : 1;
    let ry = idx === 0 ? -.34 * side : (-.1 + (idx % 2 ? .07 : -.07)) * side;
    let rx = idx === 0 ? -.05 : -.03, rz = idx === 0 ? .025 * side : 0, y = 0;
    if (!RM) {
      ry += Math.sin(t * .45) * .035 + mx * .22; rx += Math.sin(t * .6) * .014 + my * .12;
      y += Math.sin(t * .9) * .014; rz += Math.sin(t * .5) * .006;
    }
    /* الدخول: الجهاز بيطلع من تحت ويلف لمكانه */
    const intro = RM ? 1 : smooth(0, 1, t / 1.9);
    kick = damp(kick, 0, 3.2, dt);
    if (!dragging) drag = damp(drag, 0, 3, dt);
    const rate = intro < 1 ? 6 : 3.2;
    st.ry = damp(st.ry, ry + kick + drag, rate, dt);
    st.rx = damp(st.rx, rx, rate, dt);
    st.rz = damp(st.rz, rz, rate, dt);
    st.y = damp(st.y, y, intro < 1 ? 3.2 : 4, dt);
    pivot.rotation.set(st.rx, st.ry, st.rz);
    pivot.position.y = st.y;

    /* الشاشة بتنور بعد ما الجهاز يوصل */
    const wake = RM ? 1 : smooth(.8, 1.5, t);
    if (fade < 1) { const k = clamp((now - fadeT0) / 600); fade = k * k * (3 - 2 * k); if (k >= 1) fade = 1; }
    const boost = KH.takeScroll ? KH.takeScroll() : 0;
    for (const v of [previous, current]) {
      if (!v) continue;
      const a = v === current ? fade : 1 - fade;
      if (v === current) {
        if (!RM && !KH.feedPaused) v.s += 20 * S * dt;       /* ٢٠ نقطة في الثانية — هادي */
        v.s += boost * .5 * (CW / 720);
        if (v.s < 0) v.s = damp(v.s, 0, 4, dt);
      }
      const fy = ((v.s - v.top) % v.Hf + v.Hf) % v.Hf;
      v.feedTex.offset.y = 1 - fy / v.Hf - CH / v.Hf;
      v.feedMesh.material.opacity = a; v.uiMesh.material.opacity = a;
      v.feedMesh.material.color.setScalar(wake); v.uiMesh.material.color.setScalar(wake);
      v.feedMesh.renderOrder = v === current ? 12 : 10; v.uiMesh.renderOrder = v === current ? 13 : 11;
    }
    if (fade >= 1 && previous) { disposeView(previous); previous = null; }
    glare.material.map.offset.set(-st.ry * .6, st.rx * .6);

    renderer.render(scene, camera);
  }

  /* ---------- الخطوط لازم تكون جاهزة قبل ما نرسم الشاشة ---------- */
  const fontsReady = document.fonts ? Promise.all([
    document.fonts.load(`700 20px "Space Grotesk"`), document.fonts.load(`400 20px "Space Grotesk"`),
    document.fonts.load(`600 20px "IBM Plex Sans Arabic"`), document.fonts.load(`400 20px "IBM Plex Sans Arabic"`),
  ]).catch(() => {}) : Promise.resolve();
  fontsReady.then(() => {
    resize();
    show(stateKey(KH.stateIndex || 0), true);
    T0 = performance.now(); ready = true;
    wrap.classList.add('on');
    run();
  });

  /* ---------- لو مفيش WebGL: صورة ثابتة للشاشة جوه إطار CSS ---------- */
  function fallback() {
    wrap.classList.add('nogl');
    const fb = wrap.querySelector('.phone-fb'); if (!fb) return;
    const c = document.createElement('canvas'); c.width = CW; c.height = CH;
    const g = c.getContext('2d'), L = labels(), rtl = KH.lang() === 'ar';
    const fd = document.createElement('canvas'); fd.width = CW; fd.height = 16;
    const paint = () => {
      profileFeed(fd.getContext('2d'), rtl);
      g.fillStyle = '#000'; g.fillRect(0, 0, CW, CH);
      g.drawImage(fd, 0, GRID_TOP);
      const ui = document.createElement('canvas'); ui.width = CW; ui.height = CH;
      profileUI(ui.getContext('2d'), L, rtl); g.drawImage(ui, 0, 0);
    };
    onImg = () => { clearTimeout(fallback.t); fallback.t = setTimeout(paint, 60); };
    fb.appendChild(c); paint(); wrap.classList.add('on');
  }
}
