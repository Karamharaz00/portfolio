/* ============ KARAM HARAAZ — shared app ============ */
const WA = "https://wa.me/201063110138?text=" + encodeURIComponent("السلام عليكم كرم، شفت أعمالك وعايز أستفسر عن باقات التصميم");
const BE = "https://www.behance.net/karamharaaz";

const ICONS = {
  whatsapp:'<svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>',
  behance:'<svg viewBox="0 0 24 24"><path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988H0V5.021h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zM3 11h3.584c2.508 0 2.906-3-.312-3H3v3zm3.391 3H3v3.016h3.341c3.055 0 2.868-3.016.05-3.016z"/></svg>',
  instagram:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2.5" y="2.5" width="19" height="19" rx="5.5"/><circle cx="12" cy="12" r="4.4"/><circle cx="17.4" cy="6.6" r="1.15" fill="currentColor" stroke="none"/></svg>',
  x:'<svg viewBox="0 0 24 24"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/></svg>',
  linkedin:'<svg viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/></svg>',
  tiktok:'<svg viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>',
  facebook:'<svg viewBox="0 0 24 24"><path d="M13.5 21.95v-7.2h2.42l.36-2.81H13.5V10.1c0-.81.23-1.37 1.4-1.37h1.5V6.23c-.26-.03-1.15-.11-2.18-.11-2.16 0-3.64 1.32-3.64 3.74v2.08H8.14v2.81h2.44v7.2a10 10 0 002.92 0z"/></svg>',
  arrow:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:18px;height:18px"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>'
};

const SOCIALS = [
  {k:'behance',  u:'https://www.behance.net/karamharaaz',  l:'Behance'},
  {k:'instagram',u:'https://www.instagram.com/karamharaaz',l:'Instagram'},
  {k:'x',        u:'https://x.com/karamharaaz',            l:'X'},
  {k:'linkedin', u:'https://www.linkedin.com/in/karamharaaz',l:'LinkedIn'},
  {k:'tiktok',   u:'https://www.tiktok.com/@karamharaaz',  l:'TikTok'},
  {k:'facebook', u:'https://www.facebook.com/karamharaaz', l:'Facebook'},
  {k:'whatsapp', u:WA, l:'WhatsApp'}
];

const PROJECTS = [
  {id:'porati', color:'#d9a05b',    nAr:'بوراتي',           nEn:'PORATI',       cAr:'براند مخبوزات — السعودية',        cEn:'Bakery Brand — KSA',        dAr:'سلسلة تصاميم سوشيال ميديا لهوية بصرية دافئة وشهية، من لقطات المنتج إلى العروض الموسمية، بأسلوب يجعل المخبوزات نجمة كل تصميم ويثير شهية المتابع من أول نظرة.', dEn:'A warm, appetizing social media series — from product shots to seasonal offers, making the baked goods the hero.'},
  {id:'furniture', color:'#a08b6d', nAr:'اتاهومس',          nEn:'ATA HOMES',    cAr:'أثاث وديكور منزلي',               cEn:'Furniture & Home Decor',    dAr:'تصاميم سوشيال ميديا لعلامة أثاث وديكور، بأجواء هادئة وراقية تُبرز جمال القطع وتبيع أسلوب حياة كامل، وليس مجرد منتج.', dEn:'Social media designs for a furniture brand — calm, premium vibes that sell a lifestyle, not just a product.'},
  {id:'verno', color:'#7fa8c9',     nAr:'فيرنو',            nEn:'VERNO',        cAr:'ملابس شتوية — هودي',              cEn:'Winter Wear — Hoodies',     dAr:'حملة شتوية متكاملة لعلامة هودي، تنقل إحساس الدفء في كل تصميم، مع مسابقات وعروض رفعت التفاعل وقرّبت العلامة من جمهورها.', dEn:'A full winter campaign for a hoodie brand — warmth in every design, with contests and offers that boosted engagement.'},
  {id:'maalem', color:'#2e8b62',    nAr:'معلم',             nEn:'MAALEM',       cAr:'براند عطور',                      cEn:'Perfume Brand',             dAr:'تصاميم فاخرة لعلامة عطور، بدرجات خضراء عميقة وإضاءة سينمائية تعكس شخصية العطر وتمنحه حضورًا يليق به.', dEn:'Premium designs for a perfume brand — deep green tones and cinematic lighting reflecting the scent\u2019s character.'},
  {id:'yallabaytak', color:'#4a9d7c',nAr:'يلا بيتك',        nEn:'Yalla Baytak', cAr:'تطبيق عقارات — دبي',              cEn:'Real Estate App — Dubai',   dAr:'محتوى سوشيال ميديا لتطبيق عقارات، بأسلوب بسيط وواضح يوصل فكرة التطبيق في ثوانٍ، ويجعل البحث عن بيت تجربة سهلة وممتعة.', dEn:'Social media content for a real estate app — simplicity and clarity that get the idea across in seconds.'},
  {id:'rafeeq', color:'#17a398',    nAr:'رفيق',             nEn:'RafeeQ',       cAr:'سياحة علاجية — السعودية ومصر',    cEn:'Medical Tourism — KSA & EG',dAr:'هوية محتوى لمنصة سياحة علاجية، بثقة واحترافية وألوان طبية هادئة تخاطب المريض قبل الزائر، وتبني الثقة من أول تصميم.', dEn:'Content identity for a medical tourism platform — trust and professionalism in calm medical tones.'},
  {id:'tomor', color:'#c07a2e',     nAr:'تمور مكة المكرمة', nEn:'Makkah Dates', cAr:'براند تمور فاخر — السعودية',      cEn:'Premium Dates — KSA',       dAr:'تصاميم لعلامة تمور فاخرة، بأجواء تراثية راقية تقدّم المنتج كهدية قيّمة وليس مجرد تمر، مع لمسة تعكس أصالة المكان.', dEn:'Designs for a premium dates brand — refined heritage vibes presenting the product as a gift, not just dates.'},
  {id:'careoncall', color:'#8b5cf6',nAr:'كير أون كول',      nEn:'Care OnCall',  cAr:'خدمات تمريض منزلي',               cEn:'Home Nursing Services',     dAr:'حملة سوشيال ميديا لخدمات تمريض منزلية، بطاقة إنسانية دافئة في كل تصميم، وعروض واضحة تصل إلى الجمهور ببساطة.', dEn:'A social media campaign for home nursing services — energy and humanity in every design with clear offers.'}
];

const STR = {
  ar:{
    logo_n:'كرم حراز', logo_n2:'كرم حراز',
    nav_home:'الرئيسية', nav_work:'أعمالي', nav_packs:'الباقات', nav_wa:'كلمني واتساب',
    hero_label:'متاح لمشاريع جديدة',
    hero_t1:'كرم', hero_t2:'حراز',
    hero_sub:'مصمم جرافيك متخصص في السوشيال ميديا والإعلانات — بساعد البراندات تبان وتبيع من خلال تصاميم بتوقّف السكرول. +5 سنين خبرة، شغال ريموت مع عملاء في مصر والسعودية والخليج.',
    roles:['Social Media Design','Poster Design','Advertising Design','Visual Design'],
    st1:'سنين خبرة', st2:'براند اشتغلت معاه', st3:'تصميم اتسلّم',
    cta_work:'شوف أعمالي', cta_wa:'كلمني واتساب', follow:'تابعني:',
    badge_t:'مصمم سوشيال ميديا', badge_s:'وإعلانات',
    sec_work_n:'أعمالي', sec_work_t:'مشاريع مختارة', sec_work_d:'كل مشروع هنا وراه قصة — دوس على أي مشروع تشوف التصاميم كاملة.',
    sec_packs_n:'الباقات', sec_packs_t:'باقات التصميم الشهرية', sec_packs_d:'باقة ثابتة كل شهر — تصاميم احترافية بتسليم منتظم من غير ما تشيل هم.',
    view_all:'شوف كل الأعمال',
    feat_n:'مميزاتي', feat_t:'ليه تختارني؟', feat_d:'مش مجرد تصاميم حلوة — ده شغل مبني على فهم للبراند والجمهور، وتسليم يلتزم بالمواعيد.',
    f1t:'سرعة في التسليم', f1d:'شغل سريع ومنظم من غير ما الجودة تقل — وقتك محترم عندي.',
    f2t:'جودة عالية', f2d:'كل تفصيلة في التصميم مدروسة، من الألوان للخطوط للمساحات.',
    f3t:'فهم للبراند والجمهور', f3d:'التصميم عندي مش شكل بس — ده رسالة توصل للجمهور الصح.',
    f4t:'التزام ومرونة', f4d:'مواعيد محترمة، وتعديلات مريحة لحد ما تكون راضي تمامًا.',
    be_view:'شوف المشروع على بيهانس',
    prj_back:'كل الأعمال', prj_next:'المشروع التالي', prj_prev:'المشروع السابق',
    pack1:'باقة انطلاقة', pack2:'باقة نمو', hot:'الأكثر طلبًا',
    posts_m:'بوستات / شهر', posts_m2:'بوست / شهر', sar:'ريال سعودي',
    f1_1:'8 تصاميم سوشيال ميديا احترافية', f1_2:'تعديلان على كل تصميم', f1_3:'تقويم نشر مقترح', f1_4:'تسليم خلال 7 - 10 أيام',
    f2_1:'12 تصميم سوشيال ميديا احترافي', f2_2:'تعديلان على كل تصميم', f2_3:'تقويم نشر مقترح', f2_4:'أولوية في التسليم', f2_5:'+2 تصميم ستوري هدية',
    order:'اطلبها واتساب',
    pay_t:'طرق الدفع',
    pay1:'فودافون كاش', pay1d:'مصر — تحويل فوري',
    pay2:'انستاباي', pay2d:'مصر — InstaPay',
    pay3:'تحويل بنكي', pay3d:'مصر والسعودية',
    pay4:'PayPal', pay4d:'للعملاء خارج مصر',
    pay_note:'بعد ما نتفق على الباقة، هبعتلك تفاصيل الدفع المناسبة ليك على الواتساب — والشغل بيبدأ بعد تأكيد الدفع.',
    cta_t:'جاهز نخلي براندك يبان؟', cta_p:'ابعتلي على واتساب وهرد عليك في أقرب وقت — أول رد ساعات قليلة بإذن الله.',
    foot:'كرم حراز — مصمم سوشيال ميديا وإعلانات',
    home:'الرئيسية'
  },
  en:{
    logo_n:'Karam Haraz', logo_n2:'Karam Haraz',
    nav_home:'Home', nav_work:'Work', nav_packs:'Packages', nav_wa:'WhatsApp Me',
    hero_label:'Available for new projects',
    hero_t1:'Karam', hero_t2:'Haraz',
    hero_sub:'Graphic designer specialized in social media & advertising — I help brands stand out and sell through scroll-stopping designs. 5+ years of experience, working remotely with clients in Egypt, Saudi Arabia & the Gulf.',
    roles:['Social Media Design','Poster Design','Advertising Design','Visual Design'],
    st1:'Years of experience', st2:'Brands worked with', st3:'Designs delivered',
    cta_work:'View My Work', cta_wa:'WhatsApp Me', follow:'Follow me:',
    badge_t:'Social Media Designer', badge_s:'& Ads',
    sec_work_n:'My Work', sec_work_t:'Selected Projects', sec_work_d:'Every project here has a story — click any project to see the full designs.',
    sec_packs_n:'Packages', sec_packs_t:'Monthly Design Packages', sec_packs_d:'A fixed monthly package — professional designs delivered on a regular schedule, hassle-free.',
    view_all:'View All Work',
    feat_n:'My Edge', feat_t:'Why Work With Me?', feat_d:'Not just pretty designs — this is work built on understanding your brand and audience, delivered on time.',
    f1t:'Fast Delivery', f1d:'Fast, organized work without cutting corners — your time is respected.',
    f2t:'High Quality', f2d:'Every detail is considered, from colors to typography to spacing.',
    f3t:'Brand & Audience Insight', f3d:'Design here is not just looks — it\u2019s a message that reaches the right audience.',
    f4t:'Commitment & Flexibility', f4d:'Respected deadlines and comfortable revisions until you\u2019re fully satisfied.',
    be_view:'View Project on Behance',
    prj_back:'All Work', prj_next:'Next Project', prj_prev:'Previous Project',
    pack1:'Launch Package', pack2:'Growth Package', hot:'Most Popular',
    posts_m:'posts / month', posts_m2:'posts / month', sar:'SAR',
    f1_1:'8 professional social media designs', f1_2:'2 revisions per design', f1_3:'Suggested posting calendar', f1_4:'Delivery within 7–10 days',
    f2_1:'12 professional social media designs', f2_2:'2 revisions per design', f2_3:'Suggested posting calendar', f2_4:'Priority delivery', f2_5:'+2 free story designs',
    order:'Order via WhatsApp',
    pay_t:'Payment Methods',
    pay1:'Vodafone Cash', pay1d:'Egypt — instant transfer',
    pay2:'InstaPay', pay2d:'Egypt — InstaPay',
    pay3:'Bank Transfer', pay3d:'Egypt & Saudi Arabia',
    pay4:'PayPal', pay4d:'For clients outside Egypt',
    pay_note:'Once we agree on a package, I\u2019ll send you the suitable payment details on WhatsApp — work starts after payment confirmation.',
    cta_t:'Ready to make your brand stand out?', cta_p:'Message me on WhatsApp and I\u2019ll reply as soon as possible — usually within a few hours.',
    foot:'Karam Haraz — Social Media & Ads Designer',
    home:'Home'
  }
};

let LANG = localStorage.getItem('kh_lang') || 'ar';

function t(k){ return (STR[LANG] && STR[LANG][k]) || STR.ar[k] || k; }

function applyLang(){
  document.documentElement.lang = LANG;
  document.documentElement.dir = LANG === 'ar' ? 'rtl' : 'ltr';
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const k = el.getAttribute('data-i18n');
    el.innerHTML = t(k);
  });
  document.querySelectorAll('.lang-btn').forEach(b=> b.textContent = LANG==='ar' ? 'EN' : 'عربي');
  document.title = LANG==='ar' ? 'كرم حراز — مصمم سوشيال ميديا وإعلانات' : 'Karam Haraz — Social Media & Ads Designer';
  buildDynamic();
}

function toggleLang(){
  LANG = LANG === 'ar' ? 'en' : 'ar';
  localStorage.setItem('kh_lang', LANG);
  applyLang();
}

/* ---------- nav & footer ---------- */
function renderChrome(){
  const page = document.body.dataset.page || '';
  const nav = document.getElementById('nav');
  if(nav){
    nav.innerHTML = `<div class="wrap nav-in">
      <a class="logo" href="index.html"><span data-i18n="logo_n">كرم حراز</span><b>.</b></a>
      <div class="nav-links">
        <a href="index.html" class="${page==='home'?'on':''}" data-i18n="nav_home"></a>
        <a href="projects.html" class="${(page==='work'||page==='project')?'on':''}" data-i18n="nav_work"></a>
        <a href="packages.html" class="${page==='packs'?'on':''}" data-i18n="nav_packs"></a>
      </div>
      <div class="nav-cta">
        <button class="lang-btn" onclick="toggleLang()">EN</button>
        <a class="wa-btn" href="${WA}" target="_blank" rel="noopener">${ICONS.whatsapp}<span data-i18n="nav_wa"></span></a>
      </div>
    </div>`;
  }
  const foot = document.getElementById('foot');
  if(foot){
    foot.innerHTML = `<div class="wrap foot-in">
      <a class="logo" href="index.html" style="font-size:18px"><span data-i18n="logo_n2">كرم حراز</span><b>.</b></a>
      <div class="socials" id="footSoc"></div>
      <div class="mut">© 2026 — <span data-i18n="foot"></span></div>
    </div>`;
    const fs = foot.querySelector('#footSoc');
    SOCIALS.forEach(s=>{
      const a = document.createElement('a');
      a.className='soc'; a.href=s.u; a.target='_blank'; a.rel='noopener'; a.title=s.l;
      a.innerHTML = ICONS[s.k];
      fs.appendChild(a);
    });
  }
}

/* ---------- per-page dynamic content ---------- */
function buildDynamic(){
  const page = document.body.dataset.page;

  if(page === 'home'){
    // hero socials
    const hs = document.getElementById('heroSoc');
    if(hs && !hs.dataset.built){
      hs.dataset.built = 1;
      SOCIALS.forEach(s=>{
        const a = document.createElement('a');
        a.className='soc'; a.href=s.u; a.target='_blank'; a.rel='noopener'; a.title=s.l;
        a.innerHTML = ICONS[s.k];
        hs.appendChild(a);
      });
    }
    // rotating role under the name
    const role = document.getElementById('roleRot');
    if(role && !role.dataset.on){
      role.dataset.on = 1; let ri = 0;
      setInterval(()=>{
        ri = (ri+1) % t('roles').length;
        role.classList.add('swap-out');
        setTimeout(()=>{ role.textContent = t('roles')[ri]; role.classList.remove('swap-out'); }, 380);
      }, 2600);
    }
    // marquees — كل تراك بيميل لصور مختلفة، والتصاميم متبادلة بين البراندات
    document.querySelectorAll('.marquee-track').forEach((mq,ti)=>{
      const rows = ti===0 ? [1,2,3] : [4,5,6];
      let imgs = [];
      rows.forEach(r=> PROJECTS.forEach(p=> imgs.push(`assets/projects/${p.id}/${r}.jpg`))); // تصميم وجنبه تصميم من براند تاني
      const seq = imgs.concat(imgs);
      mq.innerHTML = seq.map(src=>`<div class="mq-item"><img src="${src}" loading="lazy" alt="design"></div>`).join('');
    });
    // featured projects — بتتغير لوحدها كل شوية
    const fg = document.getElementById('featGrid');
    if(fg){
      let off = 0;
      const draw = ()=>{
        fg.classList.add('fade-out');
        setTimeout(()=>{
          fg.innerHTML = [0,1,2].map(k=>pjCard(PROJECTS[(off+k)%PROJECTS.length],(off+k)%PROJECTS.length)).join('');
          fg.querySelectorAll('.pj-card').forEach(c=>c.classList.add('in'));
          fg.classList.remove('fade-out');
        }, 350);
      };
      draw();
      if(!fg.dataset.on){ fg.dataset.on=1; setInterval(()=>{ off=(off+3)%PROJECTS.length; draw(); }, 4500); }
    }
  }

  if(page === 'work'){
    const g = document.getElementById('pjGrid');
    if(g) g.innerHTML = PROJECTS.map((p,i)=>pjCard(p,i)).join('');
  }

  if(page === 'project'){
    const id = new URLSearchParams(location.search).get('id') || PROJECTS[0].id;
    const idx = Math.max(0, PROJECTS.findIndex(p=>p.id===id));
    const p = PROJECTS[idx];
    const set = (sel,html)=>{const el=document.querySelector(sel); if(el) el.innerHTML=html;};
    set('#prjNum', String(idx+1).padStart(2,'0') + ' / ' + String(PROJECTS.length).padStart(2,'0'));
    set('#prjTitle', LANG==='ar' ? p.nAr : p.nEn);
    set('#prjCat', `<span class="chip">${LANG==='ar'?p.cAr:p.cEn}</span><span class="chip">Social Media · 2025</span>`);
    set('#prjDesc', LANG==='ar' ? p.dAr : p.dEn);
    const be = document.getElementById('beBtn');
    if(be){ be.href = BE; be.innerHTML = ICONS.behance + '<span>' + t('be_view') + '</span>'; }
    const grid = document.getElementById('prjGrid');
    if(grid) grid.innerHTML = [1,2,3,4,5,6].map(i=>
      `<figure class="rv"><img src="assets/projects/${p.id}/${i}.jpg" loading="lazy" alt="${p.nEn} ${i}"></figure>`).join('');
    const prev = PROJECTS[(idx-1+PROJECTS.length)%PROJECTS.length];
    const next = PROJECTS[(idx+1)%PROJECTS.length];
    set('#prjPrev', `→ ${t('prj_prev')}: ${LANG==='ar'?prev.nAr:prev.nEn}`);
    set('#prjNext', `${t('prj_next')}: ${LANG==='ar'?next.nAr:next.nEn} ←`);
    const pp = document.getElementById('prjPrev'); if(pp) pp.href = 'project.html?id='+prev.id;
    const pn = document.getElementById('prjNext'); if(pn) pn.href = 'project.html?id='+next.id;
    bindReveal();
  }
}

function pjCard(p,i){
  return `<a class="pj-card rv rv-d${(i%3)+1}" style="--pc:${p.color}" href="project.html?id=${p.id}">
    <div class="pj-cover">
      <span class="pj-num">${String(i+1).padStart(2,'0')}</span>
      <img src="assets/projects/${p.id}/1.jpg" loading="lazy" alt="${p.nEn}">
    </div>
    <div class="pj-body">
      <div>
        <div class="pj-name">${LANG==='ar'?p.nAr:p.nEn}</div>
        <div class="pj-cat">${LANG==='ar'?p.cAr:p.cEn}</div>
      </div>
      <span class="pj-arrow">${ICONS.arrow}</span>
    </div>
  </a>`;
}

/* ---------- reveal on scroll ---------- */
let io;
function bindReveal(){
  if(io) io.disconnect();
  io = new IntersectionObserver(es=>es.forEach(e=>{
    if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
  }),{threshold:.1});
  document.querySelectorAll('.rv:not(.in)').forEach(el=>io.observe(el));
}

document.addEventListener('DOMContentLoaded', ()=>{
  renderChrome();
  applyLang();
  bindReveal();
  setTimeout(()=>document.querySelectorAll('.rv').forEach(el=>el.classList.add('in')), 1200);
});
