// Re-encodes every image the site serves from its master file.
// Run from the repo root: node tools/optimise-images.js [--dry]
// sharp is not installed here; it is borrowed from the sibling alchemy-branding-studio repo.
//
// Sizing rule: about 2x the largest rendered width. Hero backgrounds sit under a
// 65-85% black scrim, so they take much lower quality than images shown in full.
// Crops are given in "preview" coordinates: the master resized to 700px wide.
const path = require('path');
const fs = require('fs');
const sharp = require(path.resolve(__dirname, '../../alchemy-branding-studio/node_modules/sharp'));

const LIB = path.resolve(__dirname, '../../../Alchemy Clients/SMOKE & SLAW/06 MEDIA LIBRARY/PHOTOS');
const FOOD = `${LIB}/01 FOOD - DISHES`;
const EVENTS = `${LIB}/08 EVENTS & POP-UPS`;

const HERO = { q: 30, blur: 0.8 }; // under a dark scrim: a slight blur is invisible and saves ~40%
const SHOWN = { q: 66 };    // shown at full brightness
const CARD_W = 700;         // food cards render at most ~340px wide

const jobs = [
  // Hero backgrounds
  { out: 'assets/Beef_Brisket.webp', src: 'assets/Beef_Brisket.png', width: 1086, ...HERO },
  { out: 'assets/Party.webp', src: 'assets/Party.png', width: 1200, ...HERO },
  { out: 'assets/PopUp2.webp', src: 'assets/PopUp2.png', width: 1086, ...HERO },
  { out: 'images/wedding-hero.webp', src: `${FOOD}/IMG_3115.jpg`, crop: [0, 200, 700, 394], width: 1400, ...HERO },
  { out: 'images/events-hero-tray.webp', src: `${FOOD}/IMG_2581.jpg`, crop: [130, 390, 530, 280], width: 1400, ...HERO },

  // Food cards (4:3, object-fit cover)
  { out: 'images/wedding-brisket-sliced.webp', src: `${FOOD}/IMG_3116.jpg`, crop: [0, 250, 700, 525], width: CARD_W, ...SHOWN },
  { out: 'images/wedding-sausages.webp', src: `${FOOD}/IMG_3086.jpg`, crop: [0, 150, 700, 525], width: CARD_W, red: true, ...SHOWN },
  { out: 'images/sliced_beef_brisket.webp', src: 'images/sliced_beef_brisket.JPG', width: CARD_W, ...SHOWN },
  { out: 'images/traditional-barbecue-pulled-pork-slow-cooked-pulled-pork-shoulder-juicy-pork-meat-cooked-smoker.webp',
    src: 'images/traditional-barbecue-pulled-pork-slow-cooked-pulled-pork-shoulder-juicy-pork-meat-cooked-smoker.jpg', width: CARD_W, ...SHOWN },
  { out: 'images/lava-chicken.webp', src: 'images/lava-chicken.jpeg', width: CARD_W, ...SHOWN },
  { out: 'assets/Sausages.webp', src: 'assets/Sausages.JPG', width: 900, ...SHOWN }, // also the Contact hero

  // Half-width section images (~540px rendered)
  { out: 'images/wedding-spread.webp', src: `${FOOD}/IMG_3104.jpg`, width: 900, ...SHOWN },
  { out: 'images/wedding-buffet.webp', src: `${FOOD}/IMG_3076.jpg`, crop: [0, 233, 700, 700], width: 900, ...SHOWN },
  { out: 'images/meat-meat-meat-tray.webp', src: `${FOOD}/IMG_2772.jpg`, crop: [0, 200, 700, 700], width: 900, ...SHOWN },
  { out: 'images/set_up.webp', src: 'images/set_up.jpg', width: 800, ...SHOWN },
  { out: 'assets/PopUp.webp', src: 'assets/PopUp.png', width: 900, ...SHOWN },

  // Social share images stay JPEG (scrapers handle WebP badly)
  { out: 'assets/og-share.jpg', src: 'assets/Beef_Brisket.png', width: 1086, jpeg: 74 },
  { out: 'assets/og-popups.jpg', src: 'assets/PopUp2.png', width: 1086, jpeg: 74 },
];

// Past events gallery: 800px tall (renders at most 420px tall)
const gallery = [
  'WhatsApp Image 2024-08-02 at 13.07.10_7c422a53.jpg', 'IMG_0044.jpg', 'IMG_7136.jpg', 'IMG_7125.jpg',
  'IMG_2677.jpg', 'IMG_3107.jpg', 'S&S_OCT-27.jpg', 'IMG_7147.jpg', 'IMG_2658.jpg', 'IMG_7131.jpg',
  'IMG_7946.jpg', 'IMG_3117.jpg', 'IMG_1082.jpg', 'IMG_7138.jpg', 'IMG_9095.jpg',
];
gallery.forEach((file, i) => jobs.push({
  out: `images/gallery/event-${String(i + 1).padStart(2, '0')}.webp`,
  src: `${EVENTS}/${file}`, height: 800, q: 62,
}));

const dry = process.argv.includes('--dry');

(async () => {
  let before = 0, after = 0;
  for (const job of jobs) {
    const src = path.isAbsolute(job.src) ? job.src : path.resolve(__dirname, '..', job.src);
    const out = path.resolve(__dirname, '..', job.out);
    const oldSize = fs.existsSync(out) ? fs.statSync(out).size : 0;

    const master = await sharp(src).rotate().toBuffer();
    let img = sharp(master);
    if (job.crop) {
      const { width } = await sharp(master).metadata();
      const k = width / 700;
      const [l, t, w, h] = job.crop.map((v) => Math.round(v * k));
      img = img.extract({ left: l, top: t, width: w, height: h });
    }
    img = img.resize(job.height ? { height: job.height } : { width: job.width, withoutEnlargement: true });
    if (job.blur) img = img.blur(job.blur);
    if (job.red) img = img.recomb([[1.10, 0, 0], [0, 0.97, 0], [0, 0, 0.93]]).modulate({ saturation: 1.15 }).linear(1.04, -4);
    img = job.jpeg
      ? img.jpeg({ quality: job.jpeg, mozjpeg: true })
      : img.webp({ quality: job.q, effort: 6, smartSubsample: true });

    const buf = await img.toBuffer();
    // Never make a file bigger: keep the old one if the new encode doesn't win.
    const keep = oldSize && buf.length >= oldSize;
    if (!keep && !dry) fs.writeFileSync(out, buf);
    before += oldSize;
    after += keep ? oldSize : buf.length;
    console.log(`${keep ? 'kept ' : 'wrote'} ${String(oldSize >> 10).padStart(4)}KB -> ${String((keep ? oldSize : buf.length) >> 10).padStart(4)}KB  ${job.out}`);
  }
  console.log(`\nTotal ${before >> 10}KB -> ${after >> 10}KB${dry ? ' (dry run)' : ''}`);
})();
