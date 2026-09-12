/* =========================================================
   KARAM HARAZ — portfolio engine
   ========================================================= */

/* ---------- 1. CONFIG — عدّل من هنا فقط ---------- */
const CONFIG = {
  phone:  "201063110138",
  email:  "karammh112@gmail.com",
  behance:"https://www.behance.net/karamharaaz",
  /* رابط الموقع بعد الرفع — يستخدم للتحويل بعد إرسال الفورم إذا كان الجافاسكريبت متوقفًا */
  siteUrl:"",
  /* FormSubmit: بعد أول تفعيل يمكنك استبدال الإيميل بالكود المشفّر من لوحة FormSubmit */
  formEndpoint:"https://formsubmit.co/ajax/karammh112@gmail.com",
  formFallback:"https://formsubmit.co/karammh112@gmail.com",
  /* روابط الدفع — ضع هنا Payment Link لكل باقة (Stripe أو Lemon Squeezy أو Paymob) */
  pay:{
    start:  "",   // باقة البداية — 400 ريال
    growth: "",   // باقة النمو — 600 ريال
    partner:""    // باقة الشريك — 1500 ريال
  }
};

const WA_TEXT = {
  ar:"السلام عليكم كرم، شاهدت أعمالك وأود الاستفسار عن باقات التصميم.",
  en:"Hi Karam, I saw your work and I'd like to ask about your design packages."
};
const waLink = (extra)=> "https://wa.me/"+CONFIG.phone+"?text="+encodeURIComponent(extra || WA_TEXT[LANG] || WA_TEXT.ar);

/* ---------- 2. ICONS ---------- */
const ICONS = {
  whatsapp:'<svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>',
  behance:'<svg viewBox="0 0 24 24"><path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988H0V5.021h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zM3 11h3.584c2.508 0 2.906-3-.312-3H3v3zm3.391 3H3v3.016h3.341c3.055 0 2.868-3.016.05-3.016z"/></svg>',
  instagram:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2.5" y="2.5" width="19" height="19" rx="5.5"/><circle cx="12" cy="12" r="4.4"/><circle cx="17.4" cy="6.6" r="1.15" fill="currentColor" stroke="none"/></svg>',
  x:'<svg viewBox="0 0 24 24"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/></svg>',
  linkedin:'<svg viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/></svg>',
  tiktok:'<svg viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>',
  facebook:'<svg viewBox="0 0 24 24"><path d="M13.5 21.95v-7.2h2.42l.36-2.81H13.5V10.1c0-.81.23-1.37 1.4-1.37h1.5V6.23c-.26-.03-1.15-.11-2.18-.11-2.16 0-3.64 1.32-3.64 3.74v2.08H8.14v2.81h2.44v7.2a10 10 0 002.92 0z"/></svg>',
  mail:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2.5" y="4.5" width="19" height="15" rx="2.5"/><path d="M3 7l9 6 9-6"/></svg>',
  arrow:'<svg class="i-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>',
  up:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>',
  card:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2.5" y="5" width="19" height="14" rx="2.5"/><path d="M2.5 10h19"/></svg>'
};

const SOCIALS = [
  {k:'behance',  u:'https://www.behance.net/karamharaaz',    l:'Behance'},
  {k:'instagram',u:'https://www.instagram.com/karamharaaz',  l:'Instagram'},
  {k:'linkedin', u:'https://www.linkedin.com/in/karamharaaz',l:'LinkedIn'},
  {k:'x',        u:'https://x.com/karamharaaz',              l:'X'},
  {k:'tiktok',   u:'https://www.tiktok.com/@karamharaaz',    l:'TikTok'},
  {k:'facebook', u:'https://www.facebook.com/karamharaaz',   l:'Facebook'}
];

/* ---------- 3. PROJECTS ---------- */
const PROJECTS = [
  { id:'porati', color:'#d9a05b', year:'2025',
    nAr:'بوراتي', nEn:'PORATI',
    cAr:'مخبوزات — السعودية', cEn:'Bakery — KSA',
    sAr:'هوية محتوى · سوشيال ميديا', sEn:'Content identity · Social',
    dAr:'سلسلة تصاميم سوشيال ميديا لهوية بصرية دافئة وشهية، من لقطات المنتج إلى العروض الموسمية، بأسلوب يجعل المخبوزات نجمة كل تصميم ويثير شهية المتابع من أول نظرة.',
    dEn:'A warm, appetizing social series — from product shots to seasonal offers, making the baked goods the hero of every frame.'},

  { id:'furniture', color:'#a08b6d', year:'2025',
    nAr:'اتا هومس', nEn:'ATA HOMES',
    cAr:'أثاث وديكور منزلي', cEn:'Furniture & Interiors',
    sAr:'محتوى شهري · كتالوج بصري', sEn:'Monthly content · Visual catalog',
    dAr:'تصاميم سوشيال ميديا لعلامة أثاث وديكور، بأجواء هادئة وراقية تُبرز جمال القطع وتقدّم أسلوب حياة كامل، لا مجرد منتج معروض للبيع.',
    dEn:'Social designs for a furniture brand — calm, premium framing that sells a lifestyle, not just a product.'},

  { id:'verno', color:'#7fa8c9', year:'2025',
    nAr:'فيرنو', nEn:'VERNO',
    cAr:'ملابس شتوية', cEn:'Winter Apparel',
    sAr:'حملة موسمية · إعلانات', sEn:'Seasonal campaign · Ads',
    dAr:'حملة شتوية متكاملة لعلامة هودي، تنقل إحساس الدفء في كل تصميم، مع مسابقات وعروض رفعت التفاعل وقرّبت العلامة من جمهورها.',
    dEn:'A full winter campaign for a hoodie label — warmth in every frame, with contests and offers that lifted engagement.'},

  { id:'maalem', color:'#2e8b62', year:'2025',
    nAr:'معلم', nEn:'MAALEM',
    cAr:'عطور', cEn:'Fragrance',
    sAr:'اتجاه فني · تصوير سينمائي', sEn:'Art direction · Cinematic',
    dAr:'تصاميم فاخرة لعلامة عطور، بدرجات خضراء عميقة وإضاءة سينمائية تعكس شخصية العطر وتمنحه حضورًا يليق به.',
    dEn:'Premium work for a fragrance house — deep greens and cinematic light that mirror the scent’s character.'},

  { id:'yallabaytak', color:'#4a9d7c', year:'2025',
    nAr:'يلا بيتك', nEn:'Yalla Baytak',
    cAr:'تطبيق عقارات — دبي', cEn:'Real Estate App — Dubai',
    sAr:'محتوى تعريفي · واجهات', sEn:'Explainer content · UI frames',
    dAr:'محتوى سوشيال ميديا لتطبيق عقارات، بأسلوب بسيط وواضح يوصل فكرة التطبيق في ثوانٍ، ويجعل البحث عن منزل تجربة سهلة وممتعة.',
    dEn:'Social content for a real estate app — clarity that gets the idea across in seconds.'},

  { id:'rafeeq', color:'#17a398', year:'2025',
    nAr:'رفيق', nEn:'RafeeQ',
    cAr:'سياحة علاجية — السعودية ومصر', cEn:'Medical Tourism — KSA & EG',
    sAr:'هوية محتوى · بناء ثقة', sEn:'Content identity · Trust building',
    dAr:'هوية محتوى لمنصة سياحة علاجية، بثقة واحترافية وألوان طبية هادئة تخاطب المريض قبل الزائر، وتبني الثقة من أول تصميم.',
    dEn:'Content identity for a medical tourism platform — trust and professionalism in calm clinical tones.'},

  { id:'tomor', color:'#c07a2e', year:'2025',
    nAr:'تمور مكة المكرمة', nEn:'Makkah Dates',
    cAr:'تمور فاخرة — السعودية', cEn:'Premium Dates — KSA',
    sAr:'تغليف بصري · موسم', sEn:'Visual packaging · Seasonal',
    dAr:'تصاميم لعلامة تمور فاخرة، بأجواء تراثية راقية تقدّم المنتج كهدية قيّمة لا مجرد تمر، مع لمسة تعكس أصالة المكان.',
    dEn:'Designs for a premium dates brand — refined heritage that presents the product as a gift.'},

  { id:'careoncall', color:'#8b5cf6', year:'2025',
    nAr:'كير أون كول', nEn:'Care OnCall',
    cAr:'تمريض منزلي', cEn:'Home Nursing',
    sAr:'حملة خدمات · عروض', sEn:'Service campaign · Offers',
    dAr:'حملة سوشيال ميديا لخدمات تمريض منزلية، بطاقة إنسانية دافئة في كل تصميم، وعروض واضحة تصل إلى الجمهور ببساطة.',
    dEn:'A social campaign for home nursing — human warmth with offers that read clearly at a glance.'}
];

/* ---------- 4. PACKAGES (ثابتة) ---------- */
const PACKS = [
  { key:'start', medal:'🥉', price:'400', star:false,
    nAr:'باقة البداية', nEn:'Starter',
    forAr:'براند صغير يبدأ في الظهور بشكل ثابت.',
    forEn:'A small brand starting to show up consistently.',
    fAr:['6 تصميمات سوشيال ميديا في الشهر','منصة واحدة (إنستجرام)','تعديلان على كل تصميم','تسليم خلال أسبوع'],
    fEn:['6 social media designs per month','One platform (Instagram)','2 revisions per design','Delivered within one week']},

  { key:'growth', medal:'🥈', price:'600', star:true,
    nAr:'باقة النمو', nEn:'Growth',
    forAr:'براند يريد حضورًا يوميًا وثباتًا بصريًا.',
    forEn:'A brand that wants daily presence and visual consistency.',
    fAr:['12 تصميمًا في الشهر','منصتان + تكييف المقاسات','تصميم كاروسيل ضمن العدد','تعديلات مفتوحة في حدود الاتجاه المتفق عليه'],
    fEn:['12 designs per month','Two platforms + size adaptation','Carousel design included','Open revisions within the agreed direction']},

  { key:'partner', medal:'🥇', price:'1500', star:false,
    nAr:'باقة الشريك', nEn:'Partner',
    forAr:'براند يريد مصممًا يصبح جزءًا من الفريق، لا مجرد منفّذ.',
    forEn:'A brand that wants a designer on the team, not just an executor.',
    fAr:['30 تصميمًا في الشهر (حضور يومي)','كل المنصات + ستوريز + أغلفة','إشراف على الاتجاه الفني الكامل للحساب','أولوية في التسليم'],
    fEn:['30 designs per month (daily presence)','All platforms + stories + covers','Full art direction for the account','Priority delivery']}
];

/* ---------- 5. STRINGS ---------- */
const STR = {
ar:{
  brand:'كرم حراز',
  nav_home:'الرئيسية', nav_work:'الأعمال', nav_packs:'الباقات', nav_contact:'ابدأ مشروعك',
  nav_cta:'واتساب', loc:'القاهرة',

  meta_home:'كرم حراز — مصمم سوشيال ميديا وإعلانات',
  meta_work:'الأعمال — كرم حراز',
  meta_packs:'الباقات والأسعار — كرم حراز',
  meta_contact:'ابدأ مشروعك — كرم حراز',
  meta_project:'مشروع — كرم حراز',
  meta_thanks:'تم الإرسال — كرم حراز',

  avail:'متاح لاستقبال مشاريع جديدة',
  h1a:'كرم', h1b:'حراز',
  hero_sub:'مصمم جرافيك متخصص في السوشيال ميديا والإعلانات. أساعد العلامات التجارية على الظهور بثبات وبيع منتجاتها من خلال تصميم يوقف التمرير. خمس سنوات من العمل عن بُعد مع عملاء في مصر والسعودية والخليج.',
  roles:['Social Media Design','Advertising Design','Art Direction','Visual Identity'],
  cta_work:'شاهد الأعمال', cta_start:'ابدأ مشروعك', cta_wa:'تواصل عبر واتساب',
  st1:'سنوات خبرة', st2:'علامة تجارية', st3:'تصميم مُسلَّم',
  pt_role:'مصمم سوشيال ميديا وإعلانات', pt_loc:'يعمل عن بُعد من القاهرة',

  strip:['SOCIAL MEDIA DESIGN','ADVERTISING','ART DIRECTION','BRAND CONTENT','CAMPAIGNS'],

  w_n:'الأعمال', w_t:'مشاريع مختارة',
  w_d:'ثمانية مشاريع من قطاعات مختلفة — مأكولات، عطور، عقارات، رعاية صحية، أثاث وأزياء. اختر أي مشروع لتشاهد التصاميم كاملة.',
  w_all:'كل الأعمال', w_open:'فتح المشروع',

  ap_n:'طريقة العمل', ap_t:'كيف يسير المشروع',
  ap_d:'أربع خطوات واضحة من أول رسالة إلى التسليم — بلا مفاجآت في المنتصف.',
  ap1t:'نتفق على الهدف', ap1d:'رسالة قصيرة نحدد فيها البراند، الجمهور، والهدف من المحتوى. أرد عادةً خلال ساعات قليلة.',
  ap2t:'اتجاه فني قبل التنفيذ', ap2d:'أرسل الاتجاه البصري — الألوان والخطوط والإيقاع — ونعتمده معًا قبل أن يبدأ التصميم فعليًا.',
  ap3t:'تنفيذ وتسليم منتظم', ap3d:'تصاميم بمقاسات جاهزة لكل منصة، تصل في مواعيدها بلا متابعة أو تذكير منك.',
  ap4t:'تعديل ثم إغلاق', ap4d:'تعديلات ضمن حدود الاتجاه المتفق عليه، ثم تسليم الملفات النهائية بصيغها الكاملة.',

  wh_n:'لماذا أنا', wh_t:'ما الذي يختلف هنا',
  wh1t:'التزام بالمواعيد', wh1d:'التسليم في موعده جزء من الخدمة، لا ميزة إضافية تُذكر في العرض.',
  wh2t:'تصميم يخدم هدفًا', wh2d:'كل تصميم يبدأ من سؤال: ماذا نريد من المتابع أن يفعل بعد أن يراه؟',
  wh3t:'ثبات بصري', wh3d:'حساب متماسك بصريًا يبني الثقة أسرع من أي تصميم منفرد مهما كان جميلًا.',
  wh4t:'وضوح من البداية', wh4d:'السعر والنطاق ومواعيد التسليم تُتفق عليها كتابةً قبل بدء العمل.',

  pk_n:'الباقات', pk_t:'الباقات والأسعار',
  pk_d:'ثلاث باقات شهرية واضحة بالريال السعودي. أي طلب خارج الباقة يُقدَّم كعرض منفصل بسعر منفصل.',
  pk_month:'شهريًا', pk_sar:'ريال سعودي', pk_star:'الأكثر طلبًا', pk_for:'مناسبة لـ:',
  pk_pay:'ادفع الآن بالبطاقة', pk_book:'احجز الباقة', pk_ask:'أو تحدث معي أولًا',
  pk_all:'شاهد الباقات',

  rl_t:'قواعد التعامل',
  rl1:'<strong>السعر يُقال مرة واحدة.</strong> ما هو مكتوب هنا هو السعر النهائي للباقة كما هي.',
  rl2:'<strong>لا خصم مقابل الخبرة أو النشر.</strong> الخصم الوحيد المقبول هو الالتزام بثلاثة شهور مقدمًا.',
  rl3:'<strong>أي طلب خارج الباقة عرض منفصل</strong> بسعر منفصل يُتفق عليه قبل التنفيذ.',
  rl4:'<strong>الدفع <span dir="ltr">50%</span> مقدمًا و<span dir="ltr">50%</span> عند التسليم.</strong> ولا يبدأ العمل قبل وصول المقدم.',

  py_t:'طرق الدفع',
  py1:'بطاقة ائتمانية', py1d:'فيزا وماستركارد — أونلاين',
  py2:'فودافون كاش', py2d:'مصر — تحويل فوري',
  py3:'انستاباي', py3d:'مصر — InstaPay',
  py4:'تحويل بنكي', py4d:'مصر والسعودية',
  py5:'PayPal', py5d:'للعملاء خارج مصر',
  py_note:'بعد اختيار الباقة تصلك تفاصيل الدفع المناسبة لبلدك على واتساب، ويبدأ العمل فور تأكيد المقدم.',

  ct_n:'ابدأ', ct_t:'احكِ لي عن مشروعك',
  ct_d:'املأ النموذج بالتفاصيل التي تعرفها الآن — لا داعي لأن يكون كل شيء جاهزًا. أرد عادةً خلال ساعات قليلة في أيام العمل.',
  ct_i1t:'ما الذي يصلني', ct_i1d:'بياناتك تصل مباشرة إلى بريدي، ولا تُشارك مع أي جهة أخرى.',
  ct_i2t:'وقت الرد', ct_i2d:'من ساعتين إلى اثنتي عشرة ساعة في أيام العمل.',
  ct_i3t:'الخطوة التالية', ct_i3d:'مكالمة قصيرة أو رسائل نتفق فيها على النطاق والسعر وموعد البدء.',
  ct_direct:'أو تواصل مباشرة',

  fld_name:'الاسم', fld_name_p:'اسمك أو اسم العلامة التجارية',
  fld_wa:'رقم واتساب', fld_wa_p:'مع مفتاح الدولة، مثال: 201063110138',
  fld_mail:'البريد الإلكتروني', fld_mail_p:'name@example.com',
  fld_brand:'اسم البراند ومجاله', fld_brand_p:'مثال: مطعم — الرياض',
  fld_pack:'الباقة التي تهمك', fld_pack_p:'لست متأكدًا بعد',
  fld_when:'موعد البدء', fld_when_p:'اختر',
  when1:'في أقرب وقت', when2:'خلال أسبوعين', when3:'الشهر القادم', when4:'أستكشف فقط',
  fld_msg:'تفاصيل المشروع', fld_msg_p:'ما الذي تحتاجه؟ ما المنصات؟ هل هناك هوية بصرية جاهزة؟ وأي تفاصيل أخرى تراها مهمة.',
  fld_budget:'الميزانية الشهرية',
  bud1:'400 ريال', bud2:'600 ريال', bud3:'1500 ريال', bud4:'أكبر من ذلك', bud5:'غير محدد',
  f_send:'أرسل الطلب', f_sending:'جارٍ الإرسال…',
  f_note:'بالإرسال أنت توافق على أن أتواصل معك بخصوص هذا الطلب فقط.',
  f_err:'تعذّر الإرسال الآن. جرّب مرة أخرى أو راسلني على واتساب مباشرة.',
  f_req:'من فضلك أكمل الحقول المطلوبة.',

  th_t:'وصلني طلبك', th_d:'شكرًا لك. سأطّلع على التفاصيل وأرد عليك خلال ساعات قليلة في أيام العمل. إذا كان الأمر عاجلًا، راسلني على واتساب مباشرة.',
  th_home:'العودة للرئيسية',

  pj_back:'الأعمال', pj_next:'المشروع التالي', pj_prev:'المشروع السابق',
  pj_be:'شاهد المشروع على بيهانس',
  pj_f1:'العميل', pj_f2:'المجال', pj_f3:'النطاق', pj_f4:'السنة', pj_f5:'المُخرَج',
  pj_out:'ستة تصاميم مختارة من المشروع',
  pj_more:'مشاريع أخرى',

  cta_t:'جاهز لتبدأ؟', cta_p:'أرسل تفاصيل مشروعك الآن، أو راسلني على واتساب إن كان الأمر عاجلًا.',

  f_tag:'مصمم سوشيال ميديا وإعلانات — يعمل عن بُعد من القاهرة مع عملاء في مصر والسعودية والخليج.',
  f_nav:'الصفحات', f_reach:'تواصل', f_rights:'جميع الحقوق محفوظة.',
  f_built:'صُمم وبُني بعناية.',
  top:'أعلى الصفحة'
},
en:{
  brand:'Karam Haraz',
  nav_home:'Home', nav_work:'Work', nav_packs:'Packages', nav_contact:'Start a project',
  nav_cta:'WhatsApp', loc:'Cairo',

  meta_home:'Karam Haraz — Social Media & Advertising Designer',
  meta_work:'Work — Karam Haraz',
  meta_packs:'Packages & Pricing — Karam Haraz',
  meta_contact:'Start a project — Karam Haraz',
  meta_project:'Project — Karam Haraz',
  meta_thanks:'Sent — Karam Haraz',

  avail:'Available for new projects',
  h1a:'Karam', h1b:'Haraz',
  hero_sub:'Graphic designer specialised in social media and advertising. I help brands show up consistently and sell through design that stops the scroll. Five years working remotely with clients across Egypt, Saudi Arabia and the Gulf.',
  roles:['Social Media Design','Advertising Design','Art Direction','Visual Identity'],
  cta_work:'View the work', cta_start:'Start a project', cta_wa:'Message on WhatsApp',
  st1:'Years of practice', st2:'Brands worked with', st3:'Designs delivered',
  pt_role:'Social Media & Ads Designer', pt_loc:'Working remotely from Cairo',

  strip:['SOCIAL MEDIA DESIGN','ADVERTISING','ART DIRECTION','BRAND CONTENT','CAMPAIGNS'],

  w_n:'Work', w_t:'Selected projects',
  w_d:'Eight projects across food, fragrance, real estate, healthcare, furniture and apparel. Open any project to see the full set.',
  w_all:'All work', w_open:'Open project',

  ap_n:'Process', ap_t:'How a project runs',
  ap_d:'Four clear steps from first message to delivery — no surprises in between.',
  ap1t:'Agree on the goal', ap1d:'A short brief covering the brand, the audience and what the content is for. I usually reply within a few hours.',
  ap2t:'Direction before execution', ap2d:'I send the visual direction — colour, type, rhythm — and we sign it off before design starts.',
  ap3t:'Steady delivery', ap3d:'Designs sized for each platform, arriving on schedule without you having to chase them.',
  ap4t:'Revise, then close', ap4d:'Revisions within the agreed direction, then final files handed over in full.',

  wh_n:'Why me', wh_t:'What is different here',
  wh1t:'Deadlines are part of the job', wh1d:'On-time delivery is the baseline, not a bonus feature listed on a proposal.',
  wh2t:'Design with a purpose', wh2d:'Every design starts with one question: what should the viewer do after seeing it?',
  wh3t:'Visual consistency', wh3d:'A coherent feed builds trust faster than any single beautiful post ever will.',
  wh4t:'Clear from the start', wh4d:'Price, scope and deadlines are agreed in writing before any work begins.',

  pk_n:'Packages', pk_t:'Packages & pricing',
  pk_d:'Three clear monthly packages in Saudi Riyal. Anything outside a package is quoted separately.',
  pk_month:'per month', pk_sar:'SAR', pk_star:'Most popular', pk_for:'Best for:',
  pk_pay:'Pay now by card', pk_book:'Book this package', pk_ask:'Or talk to me first',
  pk_all:'View packages',

  rl_t:'How I work',
  rl1:'<strong>The price is stated once.</strong> What is written here is the final price for the package as it stands.',
  rl2:'<strong>No discount for exposure or experience.</strong> The only accepted discount is a three-month commitment paid upfront.',
  rl3:'<strong>Anything outside the package is a separate quote,</strong> agreed before the work starts.',
  rl4:'<strong>50% upfront, 50% on delivery.</strong> Work does not begin before the deposit arrives.',

  py_t:'Payment methods',
  py1:'Credit card', py1d:'Visa & Mastercard — online',
  py2:'Vodafone Cash', py2d:'Egypt — instant transfer',
  py3:'InstaPay', py3d:'Egypt — InstaPay',
  py4:'Bank transfer', py4d:'Egypt & Saudi Arabia',
  py5:'PayPal', py5d:'For clients outside Egypt',
  py_note:'Once you pick a package I send the payment details that suit your country on WhatsApp, and work starts as soon as the deposit is confirmed.',

  ct_n:'Start', ct_t:'Tell me about your project',
  ct_d:'Fill in what you know right now — it does not all have to be ready. I usually reply within a few hours on working days.',
  ct_i1t:'Where it goes', ct_i1d:'Your details reach my inbox directly and are never shared with anyone else.',
  ct_i2t:'Reply time', ct_i2d:'Two to twelve hours on working days.',
  ct_i3t:'What happens next', ct_i3d:'A short call or a few messages to agree scope, price and a start date.',
  ct_direct:'Or reach me directly',

  fld_name:'Name', fld_name_p:'Your name or brand name',
  fld_wa:'WhatsApp number', fld_wa_p:'With country code, e.g. 201063110138',
  fld_mail:'Email', fld_mail_p:'name@example.com',
  fld_brand:'Brand & industry', fld_brand_p:'e.g. Restaurant — Riyadh',
  fld_pack:'Package of interest', fld_pack_p:'Not sure yet',
  fld_when:'Start date', fld_when_p:'Choose',
  when1:'As soon as possible', when2:'Within two weeks', when3:'Next month', when4:'Just exploring',
  fld_msg:'Project details', fld_msg_p:'What do you need? Which platforms? Is there an existing brand identity? Anything else worth knowing.',
  fld_budget:'Monthly budget',
  bud1:'400 SAR', bud2:'600 SAR', bud3:'1500 SAR', bud4:'Higher', bud5:'Not set',
  f_send:'Send request', f_sending:'Sending…',
  f_note:'By sending, you agree that I may contact you about this request only.',
  f_err:'Could not send right now. Please try again or message me on WhatsApp.',
  f_req:'Please complete the required fields.',

  th_t:'Your request arrived', th_d:'Thank you. I will read the details and reply within a few hours on working days. If it is urgent, message me on WhatsApp.',
  th_home:'Back to home',

  pj_back:'Work', pj_next:'Next project', pj_prev:'Previous project',
  pj_be:'View project on Behance',
  pj_f1:'Client', pj_f2:'Sector', pj_f3:'Scope', pj_f4:'Year', pj_f5:'Output',
  pj_out:'Six selected designs from the project',
  pj_more:'More projects',

  cta_t:'Ready to start?', cta_p:'Send your project details now, or message me on WhatsApp if it is urgent.',

  f_tag:'Social media & advertising designer — working remotely from Cairo with clients across Egypt, Saudi Arabia and the Gulf.',
  f_nav:'Pages', f_reach:'Reach me', f_rights:'All rights reserved.',
  f_built:'Designed and built with care.',
  top:'Back to top'
}};

/* ---------- 6. STATE ---------- */
let LANG = 'ar';
try{ LANG = localStorage.getItem('kh_lang') || 'ar'; }catch(e){}
if(LANG !== 'en' && LANG !== 'ar') LANG = 'ar';

const t  = k => (STR[LANG] && STR[LANG][k] !== undefined) ? STR[LANG][k] : (STR.ar[k] !== undefined ? STR.ar[k] : k);
const pn = p => LANG === 'ar' ? p.nAr : p.nEn;
const pc = p => LANG === 'ar' ? p.cAr : p.cEn;
const ps = p => LANG === 'ar' ? p.sAr : p.sEn;
const pd = p => LANG === 'ar' ? p.dAr : p.dEn;
const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const pad = n => String(n).padStart(2,'0');
const page = () => document.body.dataset.page || '';

/* ---------- 7. CHROME ---------- */
function renderNav(){
  const nav = document.getElementById('nav'); if(!nav) return;
  const p = page();
  const on = k => p === k ? 'on' : '';
  const links = [
    ['index.html','nav_home','home'],
    ['projects.html','nav_work', p==='project' ? 'project' : 'work'],
    ['packages.html','nav_packs','packs'],
    ['contact.html','nav_contact','contact']
  ];
  nav.innerHTML = `
  <div class="wrap nav-in">
    <a class="brand" href="index.html"><span>${esc(t('brand'))}</span><span class="sq"></span></a>
    <div class="nav-mid">
      ${links.map(([h,k,s])=>`<a href="${h}" class="${on(s)}">${esc(t(k))}</a>`).join('')}
    </div>
    <div class="nav-end">
      <span class="clock"><span class="dot"></span><span id="clk">--:--</span><span>${esc(t('loc'))}</span></span>
      <button class="lang" onclick="toggleLang()" aria-label="Language">${LANG==='ar'?'EN':'ع'}</button>
      <a class="n-cta" href="${waLink()}" target="_blank" rel="noopener">${ICONS.whatsapp}<span>${esc(t('nav_cta'))}</span></a>
      <button class="burger" id="burger" onclick="toggleSheet()" aria-label="Menu" aria-expanded="false"><i></i><i></i><i></i></button>
    </div>
  </div>`;

  const sheet = document.getElementById('sheet');
  if(sheet){
    sheet.innerHTML = links.map(([h,k,s])=>
      `<a href="${h}" class="${on(s)}"><span>${esc(t(k))}</span><span>${LANG==='ar'?'←':'→'}</span></a>`).join('')
      + `<a class="sheet-cta" href="${waLink()}" target="_blank" rel="noopener">${ICONS.whatsapp}<span>${esc(t('cta_wa'))}</span></a>`;
  }
  startClock();
}

function startClock(){
  const el = document.getElementById('clk'); if(!el) return;
  const tick = ()=>{
    try{
      el.textContent = new Intl.DateTimeFormat('en-GB',
        {hour:'2-digit',minute:'2-digit',hour12:false,timeZone:'Africa/Cairo'}).format(new Date());
    }catch(e){ el.textContent = new Date().toTimeString().slice(0,5); }
  };
  tick();
  if(!window.__clk) window.__clk = setInterval(tick,20000);
}

function renderFooter(){
  const f = document.getElementById('foot'); if(!f) return;
  f.innerHTML = `
  <div class="wrap">
    <div class="foot-top">
      <div>
        <a class="brand" href="index.html" style="font-size:24px"><span>${esc(t('brand'))}</span><span class="sq"></span></a>
        <p style="margin-top:14px">${esc(t('f_tag'))}</p>
        <div class="socs">${SOCIALS.map(s=>
          `<a class="soc" href="${s.u}" target="_blank" rel="noopener" aria-label="${s.l}" title="${s.l}">${ICONS[s.k]}</a>`).join('')}
        </div>
      </div>
      <div class="foot-col">
        <h4>${esc(t('f_nav'))}</h4>
        <a href="index.html">${esc(t('nav_home'))}</a>
        <a href="projects.html">${esc(t('nav_work'))}</a>
        <a href="packages.html">${esc(t('nav_packs'))}</a>
        <a href="contact.html">${esc(t('nav_contact'))}</a>
      </div>
      <div class="foot-col">
        <h4>${esc(t('f_reach'))}</h4>
        <a href="${waLink()}" target="_blank" rel="noopener">WhatsApp · +20 106 311 0138</a>
        <a href="mailto:${CONFIG.email}">${CONFIG.email}</a>
        <a href="${CONFIG.behance}" target="_blank" rel="noopener">Behance · @karamharaaz</a>
      </div>
    </div>
    <div class="foot-bot">
      <span>© ${new Date().getFullYear()} ${esc(t('brand'))} — ${esc(t('f_rights'))}</span>
      <span>${esc(t('f_built'))}</span>
    </div>
  </div>`;
}

/* ---------- 8. BLOCKS ---------- */
function workRow(p,i){
  return `<a class="row rv" style="--pc:${p.color}" href="project.html?id=${p.id}" aria-label="${esc(pn(p))}">
    <span class="row-n">${pad(i+1)}</span>
    <span class="row-t">${esc(pn(p))}</span>
    <span class="row-c">${esc(pc(p))} · ${esc(ps(p))}</span>
    <span class="row-thumbs only-desk">
      <img src="assets/projects/${p.id}/1.jpg" loading="lazy" alt="">
      <img src="assets/projects/${p.id}/3.jpg" loading="lazy" alt="">
      <img src="assets/projects/${p.id}/5.jpg" loading="lazy" alt="">
    </span>
    <span class="row-a">${ICONS.arrow}</span>
  </a>`;
}

function workCard(p,i){
  return `<a class="card rv d${(i%3)+1}" style="--pc:${p.color}" href="project.html?id=${p.id}">
    <div class="card-img">
      <span class="card-n">${pad(i+1)}</span>
      <img src="assets/projects/${p.id}/1.jpg" loading="lazy" alt="${esc(pn(p))}">
      <div class="card-meta">
        <div class="t">${esc(pn(p))}</div>
        <div class="c">${esc(pc(p))}</div>
      </div>
    </div>
    <div class="card-bar"></div>
  </a>`;
}

function packCard(pk,i){
  const name = LANG==='ar'?pk.nAr:pk.nEn;
  const forx = LANG==='ar'?pk.forAr:pk.forEn;
  const feats= LANG==='ar'?pk.fAr:pk.fEn;
  const link = CONFIG.pay[pk.key === 'start' ? 'start' : pk.key === 'growth' ? 'growth' : 'partner'];
  const waMsg = (LANG==='ar'
    ? 'السلام عليكم كرم، أرغب في حجز '+name+' (‏'+pk.price+' ريال شهريًا).'
    : 'Hi Karam, I would like to book the '+name+' package ('+pk.price+' SAR / month).');
  const primary = link
    ? `<a class="btn ${pk.star?'btn-fill':'btn-paper'} btn-block" href="${link}" target="_blank" rel="noopener">${ICONS.card}<span>${esc(t('pk_pay'))}</span></a>`
    : `<a class="btn ${pk.star?'btn-fill':'btn-paper'} btn-block" href="contact.html?pack=${pk.key}">${esc(t('pk_book'))}</a>`;
  return `<div class="pack ${pk.star?'star':''} rv d${i+1}">
    ${pk.star?`<span class="pack-flag">${esc(t('pk_star'))}</span>`:''}
    <div class="pack-medal">${pk.medal}</div>
    <div class="pack-name">${esc(name)}</div>
    <div class="pack-for"><span class="mut">${esc(t('pk_for'))}</span> ${esc(forx)}</div>
    <div class="pack-price"><b>${pk.price}</b><span>${esc(t('pk_sar'))}</span></div>
    <div class="pack-per">${esc(t('pk_month'))}</div>
    <ul>${feats.map(f=>`<li><span class="ck">✓</span><span>${esc(f)}</span></li>`).join('')}</ul>
    ${primary}
    <a class="pack-alt" href="${waLink(waMsg)}" target="_blank" rel="noopener">${esc(t('pk_ask'))} ←</a>
  </div>`;
}

function bigCta(){
  return `<div class="wrap"><div class="bigcta rv">
    <h2 class="h-lg">${esc(t('cta_t'))}</h2>
    <p>${esc(t('cta_p'))}</p>
    <div class="acts">
      <a class="btn btn-fill" href="contact.html">${esc(t('cta_start'))}</a>
      <a class="btn btn-line" href="${waLink()}" target="_blank" rel="noopener">${ICONS.whatsapp}<span>${esc(t('cta_wa'))}</span></a>
    </div>
  </div></div>`;
}

/* ---------- 9. PAGE BUILDERS ---------- */
function build(){
  const p = page();
  document.title = t('meta_' + (p==='home'?'home':p==='work'?'work':p==='packs'?'packs':p==='contact'?'contact':p==='thanks'?'thanks':'project'));

  /* --- home --- */
  if(p === 'home'){
    setHTML('#h1a', esc(t('h1a')));
    setHTML('#h1b', esc(t('h1b')));
    setHTML('#featRows', PROJECTS.slice(0,5).map(workRow).join(''));
    setHTML('#packsMini', PACKS.map(packCard).join(''));
    buildMarquee();
    buildStrip();
    startRoles();
  }

  /* --- work --- */
  if(p === 'work'){
    setHTML('#allRows', PROJECTS.map(workRow).join(''));
    setHTML('#allCards', PROJECTS.map(workCard).join(''));
    buildStrip();
  }

  /* --- packages --- */
  if(p === 'packs'){
    setHTML('#packs', PACKS.map(packCard).join(''));
  }

  /* --- project --- */
  if(p === 'project') buildProject();

  /* --- contact --- */
  if(p === 'contact'){
    buildContact();
    setHTML('#sideDirect', `
      <a class="btn btn-line" href="${waLink()}" target="_blank" rel="noopener">${ICONS.whatsapp}<span>WhatsApp</span></a>
      <a class="btn btn-line" href="mailto:${CONFIG.email}">${ICONS.mail}<span>Email</span></a>`);
  }

  /* --- floating whatsapp --- */
  const wf = document.getElementById('waFloat');
  if(wf) wf.href = waLink();

  /* --- shared blocks --- */
  const cta = document.getElementById('bigcta');
  if(cta) cta.innerHTML = bigCta();

  bindReveal();
  bindPeek();
}

function setHTML(sel,html){ const el=document.querySelector(sel); if(el) el.innerHTML = html; }
function setText(sel,txt){ const el=document.querySelector(sel); if(el) el.textContent = txt; }

function buildMarquee(){
  document.querySelectorAll('.mq-track').forEach((tr,ti)=>{
    const rows = ti===0 ? [1,2,3] : [4,5,6];
    let imgs = [];
    rows.forEach(r => PROJECTS.forEach(pr => imgs.push(`assets/projects/${pr.id}/${r}.jpg`)));
    tr.innerHTML = imgs.concat(imgs).map(src =>
      `<div class="mq-i"><img src="${src}" loading="lazy" alt=""></div>`).join('');
  });
}

function buildStrip(){
  document.querySelectorAll('.strip-track').forEach(tr=>{
    const items = t('strip');
    const one = items.map(s=>`<span>${s}</span>`).join('');
    tr.innerHTML = one + one + one + one;
  });
}

function startRoles(){
  const el = document.getElementById('roleSwap'); if(!el || el.dataset.on) return;
  el.dataset.on = '1';
  let i = 0;
  el.textContent = t('roles')[0];
  setInterval(()=>{
    const list = t('roles');
    i = (i+1) % list.length;
    el.classList.add('out');
    setTimeout(()=>{ el.textContent = list[i]; el.classList.remove('out'); }, 330);
  }, 2800);
}

function buildProject(){
  const id  = new URLSearchParams(location.search).get('id');
  let idx = PROJECTS.findIndex(x => x.id === id);
  if(idx < 0) idx = 0;
  const p = PROJECTS[idx];
  document.title = pn(p) + ' — ' + t('brand');
  document.documentElement.style.setProperty('--pc', p.color);

  setHTML('#pCrumb', `<a href="index.html">${esc(t('nav_home'))}</a><span>/</span><a href="projects.html">${esc(t('pj_back'))}</a><span>/</span><span class="mut">${esc(pn(p))}</span>`);
  setHTML('#pNum', pad(idx+1)+' — '+pad(PROJECTS.length));
  setHTML('#pTitle', esc(pn(p)));
  setHTML('#pChips', `<span class="chip solid" style="--pc:${p.color}">${esc(pc(p))}</span><span class="chip">${esc(ps(p))}</span><span class="chip">${p.year}</span>`);
  setHTML('#pDesc', esc(pd(p)));
  const be = document.getElementById('pBe');
  if(be){ be.href = CONFIG.behance; be.innerHTML = ICONS.behance + '<span>'+esc(t('pj_be'))+'</span>'; }

  setHTML('#pFacts', `
    <div class="p-fact"><dt>${esc(t('pj_f1'))}</dt><dd>${esc(pn(p))}</dd></div>
    <div class="p-fact"><dt>${esc(t('pj_f2'))}</dt><dd>${esc(pc(p))}</dd></div>
    <div class="p-fact"><dt>${esc(t('pj_f3'))}</dt><dd>${esc(ps(p))}</dd></div>
    <div class="p-fact"><dt>${esc(t('pj_f4'))}</dt><dd class="num">${p.year}</dd></div>
    <div class="p-fact"><dt>${esc(t('pj_f5'))}</dt><dd>${esc(t('pj_out'))}</dd></div>`);

  setHTML('#pGal', [1,2,3,4,5,6].map(i =>
    `<figure class="rv d${i%3}" data-i="${i-1}"><img src="assets/projects/${p.id}/${i}.jpg" loading="lazy" alt="${esc(pn(p))} — ${i}"></figure>`).join(''));

  const prev = PROJECTS[(idx-1+PROJECTS.length)%PROJECTS.length];
  const next = PROJECTS[(idx+1)%PROJECTS.length];
  const a1 = document.getElementById('pPrev'), a2 = document.getElementById('pNext');
  if(a1){ a1.href='project.html?id='+prev.id; a1.innerHTML=`<span class="k">${esc(t('pj_prev'))}</span><span class="v">${esc(pn(prev))}</span>`; }
  if(a2){ a2.href='project.html?id='+next.id; a2.innerHTML=`<span class="k">${esc(t('pj_next'))}</span><span class="v">${esc(pn(next))}</span>`; }

  setHTML('#pMore', PROJECTS.filter(x=>x.id!==p.id).slice(0,3).map(workCard).join(''));
  bindLightbox(p);
}

/* ---------- 10. LIGHTBOX ---------- */
function bindLightbox(p){
  const lb = document.getElementById('lb'); if(!lb) return;
  const img = lb.querySelector('img');
  const cnt = lb.querySelector('.lb-count');
  let cur = 0;
  const show = i => {
    cur = (i+6)%6;
    img.src = `assets/projects/${p.id}/${cur+1}.jpg`;
    if(cnt) cnt.textContent = (cur+1)+' / 6';
  };
  document.querySelectorAll('#pGal figure').forEach(fig=>{
    fig.addEventListener('click', ()=>{ show(+fig.dataset.i); lb.classList.add('on'); document.body.style.overflow='hidden'; });
  });
  const close = ()=>{ lb.classList.remove('on'); document.body.style.overflow=''; };
  lb.querySelector('.lb-x').onclick = close;
  lb.addEventListener('click', e=>{ if(e.target===lb) close(); });
  lb.querySelector('[data-lb="prev"]').onclick = e=>{ e.stopPropagation(); show(cur-1); };
  lb.querySelector('[data-lb="next"]').onclick = e=>{ e.stopPropagation(); show(cur+1); };
  document.addEventListener('keydown', e=>{
    if(!lb.classList.contains('on')) return;
    if(e.key==='Escape') close();
    if(e.key==='ArrowRight') show(cur+1);
    if(e.key==='ArrowLeft')  show(cur-1);
  });
}

/* ---------- 11. CONTACT FORM ---------- */
function buildContact(){
  const packOpts = PACKS.map(pk=>{
    const n = LANG==='ar'?pk.nAr:pk.nEn;
    return `<option value="${esc(n)} — ${pk.price} SAR">${esc(n)} — ${pk.price} ${esc(t('pk_sar'))}</option>`;
  }).join('');

  const buds = ['bud1','bud2','bud3','bud4','bud5'];

  setHTML('#formHost', `
  <form class="kf" id="kform" action="${CONFIG.formFallback}" method="POST" novalidate>
    <input type="hidden" name="_subject" value="طلب جديد من الموقع — Karam Haraz">
    <input type="hidden" name="_template" value="table">
    <input type="hidden" name="_captcha" value="false">
    ${CONFIG.siteUrl?`<input type="hidden" name="_next" value="${CONFIG.siteUrl}/thanks.html">`:''}
    <input class="hp" type="text" name="_honey" tabindex="-1" autocomplete="off" aria-hidden="true">

    <div class="f-row">
      <div class="field">
        <label for="f-name">${esc(t('fld_name'))} <span class="req">*</span></label>
        <input id="f-name" name="الاسم" type="text" required placeholder="${esc(t('fld_name_p'))}" autocomplete="name">
      </div>
      <div class="field">
        <label for="f-wa">${esc(t('fld_wa'))} <span class="req">*</span></label>
        <input id="f-wa" class="ltr" name="واتساب" type="tel" required placeholder="${esc(t('fld_wa_p'))}" autocomplete="tel" inputmode="tel">
      </div>
    </div>

    <div class="f-row">
      <div class="field">
        <label for="f-mail">${esc(t('fld_mail'))}</label>
        <input id="f-mail" class="ltr" name="email" type="email" placeholder="${esc(t('fld_mail_p'))}" autocomplete="email">
      </div>
      <div class="field">
        <label for="f-brand">${esc(t('fld_brand'))}</label>
        <input id="f-brand" name="البراند" type="text" placeholder="${esc(t('fld_brand_p'))}">
      </div>
    </div>

    <div class="f-row">
      <div class="field">
        <label for="f-pack">${esc(t('fld_pack'))}</label>
        <select id="f-pack" name="الباقة">
          <option value="">${esc(t('fld_pack_p'))}</option>
          ${packOpts}
        </select>
      </div>
      <div class="field">
        <label for="f-when">${esc(t('fld_when'))}</label>
        <select id="f-when" name="موعد البدء">
          <option value="">${esc(t('fld_when_p'))}</option>
          <option>${esc(t('when1'))}</option><option>${esc(t('when2'))}</option>
          <option>${esc(t('when3'))}</option><option>${esc(t('when4'))}</option>
        </select>
      </div>
    </div>

    <div class="field">
      <label>${esc(t('fld_budget'))}</label>
      <div class="chips-in">
        ${buds.map((b,i)=>`<input type="radio" id="b${i}" name="الميزانية" value="${esc(t(b))}"><label for="b${i}">${esc(t(b))}</label>`).join('')}
      </div>
    </div>

    <div class="field">
      <label for="f-msg">${esc(t('fld_msg'))} <span class="req">*</span></label>
      <textarea id="f-msg" name="التفاصيل" required placeholder="${esc(t('fld_msg_p'))}"></textarea>
    </div>

    <div class="f-err" id="fErr"></div>

    <div class="f-foot">
      <p class="f-note">${esc(t('f_note'))}</p>
      <button class="btn btn-fill" type="submit" id="fBtn">${esc(t('f_send'))} ${ICONS.arrow}</button>
    </div>
  </form>`);

  /* preselect package from ?pack= */
  const q = new URLSearchParams(location.search).get('pack');
  if(q){
    const i = PACKS.findIndex(x=>x.key===q);
    const sel = document.getElementById('f-pack');
    if(i>=0 && sel) sel.selectedIndex = i+1;
  }
  bindForm();
}

function bindForm(){
  const form = document.getElementById('kform'); if(!form) return;
  const btn  = document.getElementById('fBtn');
  const err  = document.getElementById('fErr');

  form.addEventListener('submit', async e=>{
    e.preventDefault();
    err.classList.remove('on');

    if(form._honey.value){ return; }                      // bot trap
    if(!form.checkValidity()){
      err.textContent = t('f_req'); err.classList.add('on');
      const bad = form.querySelector(':invalid'); if(bad) bad.focus();
      return;
    }

    btn.disabled = true;
    const label = btn.innerHTML;
    btn.textContent = t('f_sending');

    const data = {};
    new FormData(form).forEach((v,k)=>{ if(k !== '_honey') data[k] = v; });
    data['اللغة'] = LANG === 'ar' ? 'عربي' : 'English';

    try{
      const r = await fetch(CONFIG.formEndpoint,{
        method:'POST',
        headers:{'Content-Type':'application/json','Accept':'application/json'},
        body:JSON.stringify(data)
      });
      if(!r.ok) throw new Error('bad status');
      location.href = 'thanks.html';
    }catch(ex){
      btn.disabled = false; btn.innerHTML = label;
      err.textContent = t('f_err'); err.classList.add('on');
    }
  });
}

/* ---------- 12. INTERACTIONS ---------- */
let io;
function bindReveal(){
  if(io) io.disconnect();
  if(!('IntersectionObserver' in window)){
    document.querySelectorAll('.rv').forEach(el=>el.classList.add('in')); return;
  }
  io = new IntersectionObserver(es=>es.forEach(e=>{
    if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
  }),{threshold:.08,rootMargin:'0px 0px -6% 0px'});
  document.querySelectorAll('.rv:not(.in)').forEach(el=>io.observe(el));
  setTimeout(()=>document.querySelectorAll('.rv:not(.in)').forEach(el=>{
    const r = el.getBoundingClientRect();
    if(r.top < window.innerHeight) el.classList.add('in');
  }), 300);
}

let MX = -999, MY = -999;
function bindPeek(){
  const peek = document.getElementById('peek'); if(!peek) return;
  if(window.matchMedia('(hover:none)').matches) return;
  const img = peek.querySelector('img');
  const place = (s)=>{
    peek.style.transform = `translate(${MX}px,${MY}px) translate(-50%,-50%) scale(${s}) rotate(-3deg)`;
  };
  document.querySelectorAll('.row').forEach(row=>{
    const id = (row.getAttribute('href')||'').split('id=')[1];
    if(!id) return;
    row.addEventListener('mouseenter',()=>{
      img.src = `assets/projects/${id}/2.jpg`;
      place(1); peek.classList.add('on');
    });
    row.addEventListener('mouseleave',()=>{ peek.classList.remove('on'); place(.9); });
  });
  if(window.__peek) return;
  window.__peek = 1;
  window.addEventListener('mousemove', e=>{
    MX = e.clientX; MY = e.clientY;
    const pk = document.getElementById('peek');
    if(!pk || !pk.classList.contains('on')) return;
    pk.style.transform = `translate(${MX}px,${MY}px) translate(-50%,-50%) scale(1) rotate(-3deg)`;
  },{passive:true});
}

function toggleSheet(){
  const s = document.getElementById('sheet'), b = document.getElementById('burger');
  if(!s) return;
  const open = s.classList.toggle('open');
  if(b){ b.classList.toggle('open', open); b.setAttribute('aria-expanded', open ? 'true':'false'); }
  document.body.style.overflow = open ? 'hidden' : '';
}

function toggleLang(){
  LANG = LANG === 'ar' ? 'en' : 'ar';
  try{ localStorage.setItem('kh_lang', LANG); }catch(e){}
  applyLang();
}

function applyLang(){
  document.documentElement.lang = LANG;
  document.documentElement.dir  = LANG === 'ar' ? 'rtl' : 'ltr';
  document.querySelectorAll('[data-i]').forEach(el=>{ el.innerHTML = t(el.getAttribute('data-i')); });
  renderNav();
  renderFooter();
  build();
}

function bindScroll(){
  const nav = document.getElementById('nav');
  const top = document.getElementById('topBtn');
  const onScroll = ()=>{
    const y = window.scrollY;
    if(nav) nav.classList.toggle('stuck', y > 24);
    if(top) top.classList.toggle('on', y > 700);
  };
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();
  if(top) top.onclick = ()=> window.scrollTo({top:0,behavior:'smooth'});
}

/* ---------- 13. BOOT ---------- */
document.addEventListener('DOMContentLoaded', ()=>{
  applyLang();
  bindScroll();
});
