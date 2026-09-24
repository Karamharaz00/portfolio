/* ══════════════════════════════════════════════════════════
   المعرض — قاعة عرض ثلاثية الأبعاد (Three.js)
   تصاميمك متعلقة كلوحات على جدران عرض، كل لوحة تحت سبوت لايت.
   السكرول بيمشّي الكاميرا جوه القاعة وبيقف قدام كل لوحة،
   وفي الآخر صورتك متعلقة كـ "المصمم".

   المصدر ده بيتبني لملف واحد: cd tools && npm install && npm run build
   الناتج: assets/gallery.js — وهو اللي الصفحة بتحمّله.
   ══════════════════════════════════════════════════════════ */
import {
  WebGLRenderer, Scene, PerspectiveCamera, Color, Fog, Group, Mesh, Points,
  PlaneGeometry, BoxGeometry, CylinderGeometry, BufferGeometry, Float32BufferAttribute,
  MeshBasicMaterial, PointsMaterial, CanvasTexture, TextureLoader, LoadingManager,
  SRGBColorSpace, AdditiveBlending, Vector3, Vector2, Raycaster, MathUtils, DoubleSide,
} from 'three';
import { Reflector } from 'three/examples/jsm/objects/Reflector.js';

const KH = window.KH;
const $ = s => document.querySelector(s);
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const smooth = (a, b, v) => { const x = clamp((v - a) / (b - a)); return x * x * (3 - 2 * x); };
const easeIO = x => x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;

const section = $('#exhibit'), canvas = $('#exCanvas');
if (section && canvas && KH) boot();

function boot() {
  let renderer;
  try {
    renderer = new WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
  } catch (e) { section.classList.add('nogl'); return; }
  if (KH.rm) { section.classList.add('nogl'); return; }

  const MOBILE = matchMedia('(max-width: 760px)').matches || navigator.maxTouchPoints > 1 && innerWidth < 1100;
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, MOBILE ? 1.5 : 1.75));
  renderer.outputColorSpace = SRGBColorSpace;

  const BG = 0x0b0b0d;
  const scene = new Scene();
  scene.background = new Color(BG);
  scene.fog = new Fog(BG, 7, 46);
  const camera = new PerspectiveCamera(42, 1, .05, 120);

  /* ---------- قوام مرسوم على كانفاس (من غير صور زيادة للتحميل) ---------- */
  function canvasTex(w, h, draw, repeat) {
    const c = document.createElement('canvas'); c.width = w; c.height = h;
    draw(c.getContext('2d'), w, h);
    const t = new CanvasTexture(c);
    t.colorSpace = SRGBColorSpace;
    if (repeat) { t.wrapS = t.wrapT = 1000; t.repeat.set(repeat[0], repeat[1]); }
    t.anisotropy = renderer.capabilities.getMaxAnisotropy();
    return t;
  }
  function noise(g, w, h, amt, base) {
    const img = g.getImageData(0, 0, w, h), d = img.data;
    for (let i = 0; i < d.length; i += 4) {
      const n = (Math.random() - .5) * amt;
      d[i] = base[0] + n; d[i + 1] = base[1] + n; d[i + 2] = base[2] + n; d[i + 3] = 255;
    }
    g.putImageData(img, 0, 0);
  }
  /* جدار عرض: جبس غامق بملمس خفيف */
  const plaster = canvasTex(512, 512, (g, w, h) => {
    noise(g, w, h, 10, [27, 26, 29]);
    for (let i = 0; i < 40; i++) {
      g.fillStyle = `rgba(${Math.random() < .5 ? '255,255,255' : '0,0,0'},.012)`;
      g.beginPath(); g.arc(Math.random() * w, Math.random() * h, 20 + Math.random() * 90, 0, 7); g.fill();
    }
  });
  /* أرضية خرسانة مصقولة */
  const concrete = canvasTex(1024, 1024, (g, w, h) => {
    noise(g, w, h, 14, [16, 16, 18]);
    for (let i = 0; i < 90; i++) {
      g.fillStyle = `rgba(${Math.random() < .5 ? '255,255,255' : '0,0,0'},.018)`;
      g.beginPath(); g.ellipse(Math.random() * w, Math.random() * h, 30 + Math.random() * 160, 10 + Math.random() * 60, Math.random() * 3, 0, 7); g.fill();
    }
    g.strokeStyle = 'rgba(0,0,0,.35)'; g.lineWidth = 2;
    for (let x = 0; x <= w; x += w / 2) { g.beginPath(); g.moveTo(x, 0); g.lineTo(x, h); g.stroke(); }
  }, [10, 36]);
  /* بقعة ضوء السبوت على الجدار — دافية وناعمة */
  const pool = canvasTex(512, 512, (g, w, h) => {
    const r = g.createRadialGradient(w / 2, h * .42, 0, w / 2, h * .5, w * .5);
    r.addColorStop(0, 'rgba(255,226,180,.95)'); r.addColorStop(.35, 'rgba(255,205,150,.45)');
    r.addColorStop(.7, 'rgba(255,190,130,.10)'); r.addColorStop(1, 'rgba(255,190,130,0)');
    g.fillStyle = r; g.fillRect(0, 0, w, h);
  });
  /* بقعة الضوء على الأرض */
  const floorPool = canvasTex(256, 256, (g, w, h) => {
    const r = g.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w / 2);
    r.addColorStop(0, 'rgba(255,215,165,.55)'); r.addColorStop(.5, 'rgba(255,200,150,.14)'); r.addColorStop(1, 'rgba(255,200,150,0)');
    g.fillStyle = r; g.fillRect(0, 0, w, h);
  });
  /* شعاع الضوء النازل من السقف */
  const shaft = canvasTex(256, 512, (g, w, h) => {
    const lg = g.createLinearGradient(0, 0, 0, h);
    lg.addColorStop(0, 'rgba(255,225,185,.9)'); lg.addColorStop(.55, 'rgba(255,215,170,.25)'); lg.addColorStop(1, 'rgba(255,215,170,0)');
    g.fillStyle = lg;
    g.beginPath(); g.moveTo(w * .44, 0); g.lineTo(w * .56, 0); g.lineTo(w, h); g.lineTo(0, h); g.closePath(); g.fill();
    g.globalCompositeOperation = 'destination-in';
    const sg = g.createLinearGradient(0, 0, w, 0);
    sg.addColorStop(0, 'rgba(0,0,0,0)'); sg.addColorStop(.5, 'rgba(0,0,0,1)'); sg.addColorStop(1, 'rgba(0,0,0,0)');
    g.fillStyle = sg; g.fillRect(0, 0, w, h);
  });
  /* ضل البرواز على الجدار */
  const shadowTex = canvasTex(256, 256, (g, w, h) => {
    g.filter = 'blur(14px)'; g.fillStyle = 'rgba(0,0,0,.85)'; g.fillRect(34, 34, w - 68, h - 68);
  });
  /* لمعة الإزاز فوق الطبعة */
  const sheen = canvasTex(512, 64, (g, w, h) => {
    const lg = g.createLinearGradient(0, 0, w, 0);
    lg.addColorStop(0, 'rgba(255,255,255,0)'); lg.addColorStop(.45, 'rgba(255,255,255,0)');
    lg.addColorStop(.5, 'rgba(255,255,255,.55)'); lg.addColorStop(.56, 'rgba(255,255,255,0)'); lg.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = lg; g.fillRect(0, 0, w, h);
  });
  /* الباسبارتو — ورق أبيض مطفي بإضاءة أقوى فوق */
  const matTex = canvasTex(256, 320, (g, w, h) => {
    noise(g, w, h, 6, [232, 229, 222]);
    const lg = g.createLinearGradient(0, 0, 0, h);
    lg.addColorStop(0, 'rgba(255,248,235,.0)'); lg.addColorStop(1, 'rgba(0,0,0,.28)');
    g.fillStyle = lg; g.fillRect(0, 0, w, h);
  });
  const dustTex = canvasTex(64, 64, (g, w, h) => {
    const r = g.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w / 2);
    r.addColorStop(0, 'rgba(255,235,205,1)'); r.addColorStop(1, 'rgba(255,235,205,0)');
    g.fillStyle = r; g.fillRect(0, 0, w, h);
  });

  /* ---------- القاعة ---------- */
  const HALL_W = 16, CEIL = 6.6;
  const SEL = KH.projects.slice(0, 8);
  const STEP = 7.5;                                  /* المسافة بين كل لوحة واللي بعدها */
  const Z0 = -6;
  const ARTS = SEL.map((p, i) => ({ p, x: i % 2 ? -1.75 : 1.75, z: Z0 - i * STEP }));
  const PORTRAIT_Z = Z0 - SEL.length * STEP - 2;
  const LEN = -PORTRAIT_Z + 14;

  const wallMat = new MeshBasicMaterial({ map: plaster, color: 0x9a9aa0 });
  const hall = new Group(); scene.add(hall);
  const sideGeo = new PlaneGeometry(LEN, CEIL);
  [-1, 1].forEach(s => {
    const m = new Mesh(sideGeo, wallMat);
    m.position.set(s * HALL_W / 2, CEIL / 2, -LEN / 2 + 8); m.rotation.y = -s * Math.PI / 2; hall.add(m);
  });
  const back = new Mesh(new PlaneGeometry(HALL_W, CEIL), wallMat);
  back.position.set(0, CEIL / 2, PORTRAIT_Z - 1.2); hall.add(back);
  const ceil = new Mesh(new PlaneGeometry(HALL_W, LEN), new MeshBasicMaterial({ color: 0x060607 }));
  ceil.rotation.x = Math.PI / 2; ceil.position.set(0, CEIL, -LEN / 2 + 8); hall.add(ceil);
  /* قضبان الإضاءة في السقف */
  [-1.75, 1.75].forEach(x => {
    const tr = new Mesh(new BoxGeometry(.06, .05, LEN), new MeshBasicMaterial({ color: 0x1d1d20 }));
    tr.position.set(x, CEIL - .08, -LEN / 2 + 8); hall.add(tr);
  });

  /* الأرضية: مراية (انعكاس) وفوقها خرسانة شبه معتمة */
  if (!MOBILE) {
    const refl = new Reflector(new PlaneGeometry(HALL_W, LEN), {
      textureWidth: Math.round(innerWidth * .5), textureHeight: Math.round(innerHeight * .5), color: 0x8a8a8a,
    });
    refl.rotation.x = -Math.PI / 2; refl.position.set(0, 0, -LEN / 2 + 8); scene.add(refl);
  }
  const floor = new Mesh(new PlaneGeometry(HALL_W, LEN), new MeshBasicMaterial({
    map: concrete, color: 0xb4b4b8, transparent: !MOBILE, opacity: MOBILE ? 1 : .84,
  }));
  floor.rotation.x = -Math.PI / 2; floor.position.set(0, .004, -LEN / 2 + 8); scene.add(floor);

  /* ---------- اللوحات ---------- */
  const loader = new TextureLoader(new LoadingManager());
  const lights = [];           /* كل حاجة بتنور — بتشتغل واحدة ورا التانية في الافتتاح */
  let AI = 0;                  /* رقم اللوحة الحالية — عشان كل لوحة تولّع في دورها */
  const L = (m, kind) => lights.push({ m, kind, idx: AI });
  const pickables = [];
  const sheens = [];
  const addMat = (tex, op) => new MeshBasicMaterial({ map: tex, transparent: true, opacity: 0, blending: AdditiveBlending, depthWrite: false, fog: true, userData: { max: op } });

  let loaded = 0; const total = SEL.length + 1;
  const tick = () => { loaded++; KH.progress && KH.progress(loaded / total); if (loaded >= total) ready(); };

  function artwork({ src, ar, x, z, h, id, big }) {
    const g = new Group(); g.position.set(x, 0, z); scene.add(g);
    const PW = big ? 5.6 : 3.4, PH = big ? 5.4 : 4.6, PD = .34;
    /* جدار العرض الواقف */
    const panel = new Mesh(new BoxGeometry(PW, PH, PD), new MeshBasicMaterial({ map: plaster, color: 0x6c6c72 }));
    panel.position.set(0, PH / 2, 0); g.add(panel);
    const front = PD / 2 + .002;
    const cy = big ? 2.55 : 2.25;
    const w = h * ar;
    const mat = big ? .16 : .2, fr = .045;
    /* بقعة الضوء */
    const lp = new Mesh(new PlaneGeometry(PW * 1.25, PH * 1.05), addMat(pool, .5));
    lp.position.set(0, cy + .25, front + .001); g.add(lp); L(lp.material, 'add');
    /* ضل البرواز */
    const sh = new Mesh(new PlaneGeometry(w + mat * 2 + .5, h + mat * 2 + .5), new MeshBasicMaterial({ map: shadowTex, transparent: true, opacity: .75, depthWrite: false }));
    sh.position.set(0, cy - .09, front + .004); g.add(sh);
    /* البرواز: أسود معدني رفيع */
    const OW = w + mat * 2 + fr * 2, OH = h + mat * 2 + fr * 2;
    const frameMat = new MeshBasicMaterial({ color: 0x0c0c0d });
    const edgeMat = new MeshBasicMaterial({ color: 0x3a3a3e });
    const bar = (bw, bh, px, py) => {
      const b = new Mesh(new BoxGeometry(bw, bh, .06), frameMat); b.position.set(px, py, front + .03); g.add(b);
    };
    bar(OW, fr, 0, cy + OH / 2 - fr / 2); bar(OW, fr, 0, cy - OH / 2 + fr / 2);
    bar(fr, OH, -OW / 2 + fr / 2, cy); bar(fr, OH, OW / 2 - fr / 2, cy);
    const topEdge = new Mesh(new BoxGeometry(OW, .006, .062), edgeMat); topEdge.position.set(0, cy + OH / 2, front + .03); g.add(topEdge);
    /* الباسبارتو */
    const mm = new Mesh(new PlaneGeometry(w + mat * 2, h + mat * 2), new MeshBasicMaterial({ map: matTex, color: 0x000000 }));
    mm.position.set(0, cy, front + .012); g.add(mm); L(mm.material, 'mat');
    /* الطبعة */
    const print = new Mesh(new PlaneGeometry(w, h), new MeshBasicMaterial({ color: 0x000000, toneMapped: false }));
    print.position.set(0, cy, front + .014); g.add(print);
    print.userData.id = id; pickables.push(print);
    L(print.material, 'print');
    loader.load(src, t => {
      t.colorSpace = SRGBColorSpace; t.anisotropy = renderer.capabilities.getMaxAnisotropy();
      print.material.map = t; print.material.needsUpdate = true; tick();
    }, undefined, tick);
    /* الإزاز */
    const gl = new Mesh(new PlaneGeometry(w, h), new MeshBasicMaterial({ map: sheen.clone(), transparent: true, opacity: .07, blending: AdditiveBlending, depthWrite: false }));
    gl.material.map.needsUpdate = true;
    gl.position.set(0, cy, front + .02); g.add(gl); sheens.push({ m: gl, x: x });
    /* شعاع الضوء + الكشاف + البقعة على الأرض */
    const shH = CEIL - .2;
    const sf = new Mesh(new PlaneGeometry(big ? 4.6 : 3.4, shH), addMat(shaft, .11));
    sf.position.set(0, shH / 2 + .1, front + 1.1); sf.rotation.x = -.12; g.add(sf); L(sf.material, 'add');
    const fixture = new Mesh(new CylinderGeometry(.08, .1, .28, 16), new MeshBasicMaterial({ color: 0x232326 }));
    fixture.position.set(0, CEIL - .3, front + 1.35); fixture.rotation.x = .5; g.add(fixture);
    const lamp = new Mesh(new CylinderGeometry(.075, .075, .01, 16), addMat(dustTex, 1));
    lamp.position.set(0, CEIL - .44, front + 1.28); lamp.rotation.x = .5; g.add(lamp); L(lamp.material, 'add');
    const fp = new Mesh(new PlaneGeometry(PW * 1.3, 3.2), addMat(floorPool, .55));
    fp.rotation.x = -Math.PI / 2; fp.position.set(0, .012, front + 1.2); g.add(fp); L(fp.material, 'add');
    AI++;
    return { g, cy, w, h, x, z: z + front };
  }

  const artObjs = ARTS.map(a => artwork({
    src: `projects/${a.p.id}/1.jpg`, ar: a.p.w / a.p.h, x: a.x, z: a.z, h: 2.5, id: a.p.id,
  }));
  const portrait = artwork({ src: 'karam.jpg', ar: 1, x: 0, z: PORTRAIT_Z, h: 3.1, id: '__me', big: true });

  /* غبار في الضوء */
  const DN = MOBILE ? 260 : 700, dpos = new Float32Array(DN * 3), dseed = new Float32Array(DN);
  for (let i = 0; i < DN; i++) {
    const a = ARTS[i % ARTS.length] || { x: 0, z: PORTRAIT_Z };
    dpos[i * 3] = a.x + (Math.random() - .5) * 3; dpos[i * 3 + 1] = Math.random() * CEIL; dpos[i * 3 + 2] = a.z + 1.2 + (Math.random() - .5) * 2.4;
    dseed[i] = Math.random() * 100;
  }
  const dgeo = new BufferGeometry(); dgeo.setAttribute('position', new Float32BufferAttribute(dpos, 3));
  const dust = new Points(dgeo, new PointsMaterial({ map: dustTex, size: .035, transparent: true, opacity: 0, blending: AdditiveBlending, depthWrite: false, sizeAttenuation: true }));
  dust.material.userData.max = .55;
  scene.add(dust);

  /* ---------- مسار الكاميرا ---------- */
  let STOPS = [], rtl = false, portraitView = false;
  function buildStops() {
    const aspect = camera.aspect;
    portraitView = aspect < .9;
    rtl = document.documentElement.dir === 'rtl';
    camera.fov = portraitView ? 58 : 40;
    camera.updateProjectionMatrix();
    /* اللوحة بتتزق ناحية عكس الليبل عشان الاتنين يبانوا مع بعض */
    const shift = portraitView ? 0 : (rtl ? .95 : -.95);
    const dist = portraitView ? 6.2 : 5.3;
    STOPS = [{ pos: new Vector3(portraitView ? .6 : -.4, 1.75, 8.5), look: new Vector3(portraitView ? .9 : (rtl ? 2.4 : -1.6), portraitView ? 2.6 : 1.35, -30) }];
    artObjs.forEach(o => {
      STOPS.push({
        pos: new Vector3(o.x * .55, 1.72, o.z + dist),
        look: new Vector3(o.x + shift, o.cy - (portraitView ? .75 : .05), o.z),
      });
    });
    STOPS.push({
      pos: new Vector3(0, 1.8, portrait.z + dist + 1.4),
      look: new Vector3(shift * 1.2, portrait.cy - (portraitView ? .9 : .1), portrait.z),
    });
    KH.stops = STOPS.length - 1;
  }

  /* ---------- المقاسات ---------- */
  function resize() {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    buildStops();
    KH.layoutExhibit && KH.layoutExhibit(STOPS.length - 1);
  }
  addEventListener('resize', resize);
  addEventListener('kh:lang', resize);

  /* ---------- الماوس: بتحرك الكاميرا سنة + هوفر على اللوحات ---------- */
  const ray = new Raycaster(), ndc = new Vector2(9, 9);
  let mx = 0, my = 0, hover = null;
  addEventListener('pointermove', e => {
    mx = e.clientX / innerWidth - .5; my = e.clientY / innerHeight - .5;
    const r = canvas.getBoundingClientRect();
    ndc.set((e.clientX - r.left) / r.width * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
  }, { passive: true });
  canvas.addEventListener('click', () => {
    if (!hover) return;
    if (hover === '__me') KH.openMe && KH.openMe(); else KH.open(hover);
  });

  /* ---------- الافتتاح: الأنوار بتولّع واحدة ورا التانية ---------- */
  let T0 = 0, isReady = false;
  function ready() {
    if (isReady) return; isReady = true;
    T0 = performance.now();
    section.classList.add('lit');
    KH.progress && KH.progress(1);
  }
  setTimeout(ready, 9000);

  function lightLevel(i, now) {
    if (!isReady) return 0;
    const t = (now - T0) / 1000 - .35 - i * .22;
    if (t <= 0) return 0;
    /* رعشة خفيفة زي لمبة التنجستن وهي بتولّع */
    const flick = t < .28 ? (Math.sin(t * 90) > 0 ? .35 : .05) : 1;
    return Math.min(1, t * 2.2) * flick;
  }

  /* ---------- اللوب ---------- */
  const cam = new Vector3().copy(new Vector3(0, 1.9, 13)), look = new Vector3(0, 2.3, -30);
  const tp = new Vector3(), tl = new Vector3();
  let last = performance.now(), visible = true, running = false;
  const io = new IntersectionObserver(es => { visible = es[0].isIntersecting; if (visible) start(); }, { threshold: 0 });
  io.observe(section);
  document.addEventListener('visibilitychange', () => { if (!document.hidden) start(); });
  addEventListener('kh:route', () => { resize(); start(); });

  function start() { if (!running) { running = true; last = performance.now(); requestAnimationFrame(loop); } }

  function loop(now) {
    if (!visible || document.hidden || !KH.isHome()) { running = false; return; }
    requestAnimationFrame(loop);
    const dt = Math.min(.05, (now - last) / 1000); last = now;
    const N = STOPS.length - 1;
    const s = (KH.exProgress ? KH.exProgress() : 0) * N;
    const k = Math.min(N - 1, Math.floor(s)), f = s - k;
    const tt = easeIO(smooth(.3, 1, f));
    const A = STOPS[k], B = STOPS[Math.min(N, k + 1)];
    tp.lerpVectors(A.pos, B.pos, tt); tl.lerpVectors(A.look, B.look, tt);
    /* في الافتتاح الكاميرا بتدخل من ورا */
    const intro = isReady ? smooth(0, 1, (now - T0) / 3200) : 0;
    tp.z += (1 - easeIO(intro)) * 6; tp.y += (1 - easeIO(intro)) * .35;
    tp.x += mx * .35; tl.x += mx * 1.1; tl.y -= my * .6;
    const kk = 1 - Math.exp(-dt * 4.5);
    if (KH.snap) { cam.copy(tp); look.copy(tl); } else { cam.lerp(tp, kk); look.lerp(tl, kk); }
    camera.position.copy(cam); camera.lookAt(look);

    /* الأنوار */
    for (const o of lights) {
      const lv = lightLevel(o.idx, now);
      if (o.kind === 'print') o.m.color.setScalar(.06 + .94 * lv);
      else if (o.kind === 'mat') o.m.color.setScalar(.05 + .9 * lv);
      else o.m.opacity = o.m.userData.max * lv;
    }
    dust.material.opacity = isReady ? .55 * smooth(2.2, 3.6, (now - T0) / 1000) : 0;
    /* الإزاز بيلمع حسب مكان الكاميرا */
    for (const sn of sheens) sn.m.material.map.offset.x = (cam.x - sn.x) * .08 - cam.z * .006;
    /* الغبار بيطفو */
    const arr = dgeo.attributes.position.array;
    for (let i = 0; i < DN; i++) {
      arr[i * 3 + 1] += Math.sin(now * .0003 + dseed[i]) * .0009 + .0006;
      arr[i * 3] += Math.cos(now * .0002 + dseed[i]) * .0006;
      if (arr[i * 3 + 1] > CEIL) arr[i * 3 + 1] = 0;
    }
    dgeo.attributes.position.needsUpdate = true;

    /* هوفر */
    let h = null;
    if (!MOBILE && ndc.x < 2) {
      ray.setFromCamera(ndc, camera);
      const hit = ray.intersectObjects(pickables, false)[0];
      if (hit && hit.distance < 16) h = hit.object.userData.id;
    }
    if (h !== hover) { hover = h; canvas.style.cursor = h ? 'pointer' : ''; KH.hoverArt && KH.hoverArt(!!h); }

    KH.exFrame && KH.exFrame(s, N);
    renderer.render(scene, camera);
  }

  resize();
  start();
}
