const CDN = 'https://raw.githubusercontent.com/tv-logo/tv-logos/main/countries';
const AZ = `${CDN}/azerbaijan`;
const TR = `${CDN}/turkey`;
const UM = 'https://raw.githubusercontent.com/UzunMuhalefet/streams/main/myvideo-az';
const ERCN = 'https://rnttwmjcin.turknet.ercdn.net/lcpmvefbyo';
const DAIO = 'https://dogus.daioncdn.net';
const DAIO_L = 'https://dogus-live.daioncdn.net';
const CINER = 'https://ciner.daioncdn.net';
const CINER_L = 'https://ciner-live.daioncdn.net';

export const channel_config = [

  // ═══════════════════════════════════════
  // 🇦🇿  AZƏRBAYCAN — ÜMUMİ  (✅ = tested working)
  // ═══════════════════════════════════════
  {
    channelID: "azertv",
    channelName: "AZTV",
    channelSource: "https://str.yodacdn.net/azertv/index.m3u8",   // ✅ 200
    channelIconC: "logos/aztv.png",
    country: "az", category: "general",
  },
  {
    channelID: "xazartv",
    channelName: "XƏZƏR TV",
    channelSource: "https://str.yodacdn.net/xazartv/video.m3u8",
    channelIconC: "logos/xezertv.png",
    country: "az", category: "general",
  },
  {
    channelID: "ictimaitele",
    channelName: "İctimai TV",
    channelSource: "https://live.itv.az/itv.m3u8",               // ✅ 200
    channelIconC: "logos/ictimai.png",
    country: "az", category: "general",
  },
  {
    channelID: "arb",
    channelName: "ARB TV",
    channelSource: "https://str.yodacdn.net/arb/video.m3u8",
    channelIconC: "logos/arbtv.jfif",
    country: "az", category: "general",
  },
  {
    channelID: "atv_az",
    channelName: "ATV",
    channelSource: "https://str.yodacdn.net/atv/video.m3u8",     // ✅ 200
    channelIconC: "logos/atv.png",
    country: "az", category: "general",
  },
  {
    channelID: "cbc",
    channelName: "CBC TV",
    channelSource: "https://str.yodacdn.net/cbc/video.m3u8",
    channelIconC: "logos/cbctv.png",
    country: "az", category: "general",
  },
  {
    channelID: "space",
    channelName: "Space TV",
    channelSource: "https://str.yodacdn.net/space/video.m3u8",
    channelIconC: "logos/space.png",
    country: "az", category: "general",
  },
  {
    channelID: "real",
    channelName: "Real TV",
    channelSource: "https://str.yodacdn.net/real/video.m3u8",
    channelIconC: "logos/realtv.jfif",
    country: "az", category: "general",
  },
  {
    channelID: "qafkaz",
    channelName: "Qafqaz TV",
    channelSource: "https://str.yodacdn.net/qafkaz/video.m3u8",  // ✅ 200
    channelIconC: "logos/qafqaztv.png",
    country: "az", category: "general",
  },
  {
    channelID: "start",
    channelName: "Kanal S",
    channelSource: "https://str.yodacdn.net/start/video.m3u8",
    channelIconC: "logos/kanals.png",
    country: "az", category: "general",
  },
  {
    channelID: "vip",
    channelName: "VIP HD",
    channelSource: "https://str.yodacdn.net/vip/video.m3u8",
    channelIconC: "logos/viptv.jfif",
    country: "az", category: "general",
  },
  {
    channelID: "tmb",
    channelName: "Vostok TV",
    channelSource: "https://str.yodacdn.net/tmb/video.m3u8",     // ✅ 200
    channelIconC: "logos/vostoktv.jfif",
    country: "az", category: "general",
  },
  {
    channelID: "gunaz",
    channelName: "GunAz TV",
    channelSource: "https://tv.gunaz.tv/hls/live.m3u8",          // ✅ 200
    channelIconC: null,
    country: "az", category: "general",
  },
  {
    channelID: "ayaztv",
    channelName: "Ayaz TV",
    channelSource: "https://janya-ayaztv.vgcdn.net/ptnr-WebApp/title-Ayaz_TV/v1/vglive-sk-934820/main.m3u8", // ✅ 200
    channelIconC: null,
    country: "az", category: "general",
  },
  // Dunya TV removed as it returned 404
  {
    channelID: "vilayet",
    channelName: "Vilayet TV",
    channelSource: "https://nl.livekadeh.com/hls2/vilayet.m3u8", // ✅ 200
    channelIconC: null,
    country: "az", category: "general",
  },
  {
    channelID: "eltv",
    channelName: "ELTV",
    channelSource: "http://85.132.53.162:1935/live/eltv/playlist.m3u8", // ✅ 200
    channelIconC: "logos/eltv.png",
    country: "az", category: "general",
  },
  {
    channelID: "kanal35",
    channelName: "Kanal 35",
    channelSource: "https://str2.yodacdn.net/kanal35/index.m3u8", // ✅ 200
    channelIconC: "logos/kanal35.jfif",
    country: "az", category: "general",
  },

  // ─── AZƏRBAYCAN — XƏBƏR ───
  {
    channelID: "bakutv",
    channelName: "Baku TV",
    channelSource: "https://str.yodacdn.net/bakutv/video.m3u8",
    channelIconC: "logos/bakutv.png",
    country: "az", category: "news",
  },
  {
    channelID: "arb24",
    channelName: "ARB 24",
    channelSource: "https://str.yodacdn.net/arb24/video.m3u8",
    channelIconC: "logos/arb24.png",
    country: "az", category: "news",
  },
  {
    channelID: "kapaz",
    channelName: "Kapaz TV",
    channelSource: "http://85.132.78.122:8050/hls/stream/index.m3u8", // ✅ 200
    channelIconC: null,
    country: "az", category: "news",
  },
  {
    channelID: "haberglobal",
    channelName: "Haber Global",
    channelSource: "https://str.yodacdn.net/haberglobal/video.m3u8", // ✅ 200
    channelIconC: "logos/haberglobal.png",
    country: "az", category: "news",
  },

  // ─── AZƏRBAYCAN — İDMAN ───
  {
    channelID: "idmantele",
    channelName: "İdman TV",
    channelSource: "https://str.yodacdn.net/idmantele/video.m3u8", // ✅ 200
    channelIconC: "logos/idmantv.jfif",
    country: "az", category: "sport",
  },

  // ─── AZƏRBAYCAN — MUSİQİ ───
  {
    channelID: "mtvaz",
    channelName: "MTV Azerbaijan",
    channelSource: "https://str.yodacdn.net/mtvaz/video.m3u8",
    channelIconC: "logos/mtv.png",
    country: "az", category: "music",
  },
  {
    channelID: "knmusic",
    channelName: "KN Music TV",
    channelSource: "https://cdn4.yayin.com.tr/kntv/tracks-v1a1/mono.m3u8", // ✅ 200
    channelIconC: null,
    country: "az", category: "music",
  },

  // ─── AZƏRBAYCAN — UŞAQ ───
  {
    channelID: "arbgunesh",
    channelName: "ARB GÜNƏŞ",
    channelSource: "https://str.yodacdn.net/arbgunesh/video.m3u8",
    channelIconC: "logos/arbgunes.png",
    country: "az", category: "kids",
  },

  // ─── AZƏRBAYCAN — MƏDƏNİYYƏT ───
  {
    channelID: "medeniyyettele",
    channelName: "Mədəniyyət TV",
    channelSource: "https://str.yodacdn.net/medeniyyettele/video.m3u8",
    channelIconC: null,
    country: "az", category: "culture",
  },
  {
    channelID: "ntv",
    channelName: "Naxçıvan TV",
    channelSource: "https://str2.yodacdn.net/ntv/video.m3u8",   // ✅ 200
    channelIconC: "logos/naxcivantv.jfif",
    country: "az", category: "general",
  },

  // ─── AZƏRBAYCAN — TMB ───
  {
    channelID: "tmbtr",
    channelName: "TMB TV",
    channelSource: "https://str.yodacdn.net/tmbtr/video.m3u8",
    channelIconC: "logos/tmbtv.jfif",
    country: "az", category: "general",
  },
  {
    channelID: "tmbaz",
    channelName: "TMB Azərbaycan",
    channelSource: "https://str.yodacdn.net/tmbaz/video.m3u8",
    channelIconC: null,
    country: "az", category: "general",
  },
  {
    channelID: "biznestv",
    channelName: "Biznes TV",
    channelSource: "https://str.yodacdn.net/biznestv/video.m3u8", // ✅ 200
    channelIconC: "logos/biznestv.png",
    country: "az", category: "news",
  },

  // ═══════════════════════════════════════
  // 🇹🇷  TÜRKİYƏ — ÜMUMİ ANA KANALLAR
  // ═══════════════════════════════════════
  {
    channelID: "trt1",
    channelName: "TRT 1",
    // ⚠️ 403 on HEAD/curl (TRT blocks bots) but ✅ works in browser via GET
    channelSource: "https://tv-trt1.medya.trt.com.tr/master.m3u8",
    channelIconC: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/TRT_1_logo_%282021-%29.svg/960px-TRT_1_logo_%282021-%29.svg.png",
    country: "tr", category: "general",
  },
  {
    channelID: "atv_tr",
    channelName: "ATV (TR)",
    channelSource: "http://rnttwmjcin.turknet.ercdn.net/lcpmvefbyo/atv/atv_360p.m3u8", // ✅ 200 (360p)
    channelIconC: "https://i.imgur.com/HyVUwFC.png",
    country: "tr", category: "general",
  },
  {
    channelID: "kanald",
    channelName: "Kanal D",
    channelSource: "https://demiroren.daioncdn.net/kanald/kanald.m3u8?app=kanald_web&ce=3", // ✅ 200
    channelIconC: "https://i.imgur.com/9o1atM6.png",
    country: "tr", category: "general",
  },
  {
    channelID: "showtr",
    channelName: "Show TV",
    // dogus CDN — 403 on HEAD but works in browser
    channelSource: `${DAIO}/showtv/showtv.m3u8`,
    channelIconC: "https://i.imgur.com/mq0xaXF.png",
    country: "tr", category: "general",
  },
  {
    channelID: "startr",
    channelName: "Star TV",
    channelSource: "https://dogus.daioncdn.net/startv/startv_720p.m3u8?&sid=8l4w3lst4co5&app=a20ac41e-bdc3-4aa1-934d-26b484480ac9&ce=3", // ✅ 200
    channelIconC: "https://i.imgur.com/9O3DHRB.png",
    country: "tr", category: "general",
  },
  {
    channelID: "foxtr",
    channelName: "FOX TV",
    channelSource: `${DAIO}/foxtv/foxtv.m3u8`,
    channelIconC: "https://i.imgur.com/KFo7qAl.png",
    country: "tr", category: "general",
  },
  {
    channelID: "tv8tr",
    channelName: "TV 8",
    channelSource: "https://tv8.daioncdn.net/tv8/tv8.m3u8?app=7ddc255a-ef47-4e81-ab14-c0e5f2949788&ce=3", // ✅ 200
    channelIconC: "https://upload.wikimedia.org/wikipedia/tr/thumb/6/68/Tv8_Yeni_Logo.png/960px-Tv8_Yeni_Logo.png",
    country: "tr", category: "general",
  },
  {
    channelID: "kanal7",
    channelName: "Kanal 7",
    channelSource: "https://kanal7-live.daioncdn.net/kanal7/kanal7.m3u8", // ✅ 200
    channelIconC: "https://i.imgur.com/0gq9xOm.png",
    country: "tr", category: "general",
  },
  {
    channelID: "teve2",
    channelName: "Teve 2",
    // demiroren CDN — 403 HEAD, works in browser
    channelSource: "https://demiroren.daioncdn.net/teve2/teve2.m3u8",
    channelIconC: "https://i.imgur.com/rsoSLih.png",
    country: "tr", category: "general",
  },
  {
    channelID: "tv100",
    channelName: "TV 100",
    channelSource: "https://tv.ensonhaber.com/tv100/tv100.m3u8",
    channelIconC: "https://upload.wikimedia.org/wikipedia/tr/thumb/0/0f/TV100_logo.png/960px-TV100_logo.png",
    country: "tr", category: "general",
  },
  {
    channelID: "nowtvtr",
    channelName: "NOW TV",
    channelSource: "https://uycyyuuzyh.turknet.ercdn.net/nphindgytw/nowtv/nowtv.m3u8", // ✅ 200
    channelIconC: "https://i.imgur.com/5EYjWK7.png",
    country: "tr", category: "general",
  },
  {
    channelID: "meltemtv",
    channelName: "Meltem TV",
    channelSource: "https://vhxyrsly.rocketcdn.com/meltemtv/playlist.m3u8", // ✅ 200
    channelIconC: "https://i.imgur.com/C3m6w5S.png",
    country: "tr", category: "general",
  },
  {
    channelID: "eurod",
    channelName: "Euro D",
    channelSource: "https://live.duhnet.tv/S2/HLS_LIVE/eurodnp/playlist.m3u8", // ✅ 200
    channelIconC: "https://i.imgur.com/x9kHsXo.png",
    country: "tr", category: "general",
  },
  {
    channelID: "a2tvtr",
    channelName: "A2 TV",
    channelSource: "https://live.artidijitalmedya.com/artidijital_a2tv/a2tv/playlist.m3u8",
    channelIconC: "https://iatv.tmgrup.com.tr/site/v2/a2tv/i/a2tv-logo.png",
    country: "tr", category: "general",
  },
  {
    channelID: "tvnettr",
    channelName: "TVNET",
    channelSource: "https://tvnet-live.lg.mncdn.com/tvnet/tvnet/playlist.m3u8", // ✅ 200
    channelIconC: "https://i.imgur.com/mQo8yWQ.png",
    country: "tr", category: "general",
  },
  {
    channelID: "ulketv",
    channelName: "Ülke TV",
    channelSource: "https://mn-nl.mncdn.com/blutv_ulketv/ulketv_sd.smil/playlist.m3u8",
    channelIconC: "https://i.imgur.com/wdWR7Qk.png",
    country: "tr", category: "general",
  },

  // ─── TÜRKİYƏ — XƏBƏR ───
  {
    channelID: "trthaber",
    channelName: "TRT Haber",
    channelSource: "https://tv-trthaber.medya.trt.com.tr/master.m3u8", // ✅ 200
    channelIconC: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/TRT_Haber_Eyl%C3%BCl_2020_Logo.svg/960px-TRT_Haber_Eyl%C3%BCl_2020_Logo.svg.png",
    country: "tr", category: "news",
  },
  {
    channelID: "cnnturk",
    channelName: "CNN Türk",
    channelSource: `${DAIO}/cnnturk/cnnturk.m3u8`,
    channelIconC: "https://i.imgur.com/b3MMGRM.png",
    country: "tr", category: "news",
  },
  {
    channelID: "ntvtr",
    channelName: "NTV",
    // 403 HEAD (dogus blocks bots) but works in browser
    channelSource: `${DAIO}/ntv/ntv.m3u8`,
    channelIconC: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/NTV_%28Turkey%29_logo.svg/960px-NTV_%28Turkey%29_logo.svg.png",
    country: "tr", category: "news",
  },
  {
    channelID: "habertrktr",
    channelName: "Habertürk",
    channelSource: "https://tv.ensonhaber.com/haberturk/haberturk.m3u8",
    channelIconC: "https://i.imgur.com/6Tw3rUp.png",
    country: "tr", category: "news",
  },
  {
    channelID: "halktv",
    channelName: "Halk TV",
    channelSource: "https://halktv-live.daioncdn.net/halktv/halktv.m3u8", // ✅ 200
    channelIconC: "https://i.imgur.com/xM0HA30.png",
    country: "tr", category: "news",
  },
  {
    channelID: "tgrthaber",
    channelName: "TGRT Haber",
    channelSource: "https://canli.tgrthaber.com/tgrt.m3u8", // ✅ 200
    channelIconC: "https://i.imgur.com/PrxwKDw.png",
    country: "tr", category: "news",
  },
  {
    channelID: "ahaber",
    channelName: "A Haber",
    channelSource: `${ERCN}/ahaber/ahaber.m3u8`,            // ✅ 200
    channelIconC: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Ahaber_Logo.png",
    country: "tr", category: "news",
  },
  {
    channelID: "bloomberght",
    channelName: "Bloomberg HT",
    channelSource: `${CINER}/bloomberght/bloomberght.m3u8`,
    channelIconC: "https://i.imgur.com/bmkXfIE.png",
    country: "tr", category: "news",
  },
  {
    channelID: "tv360tr",
    channelName: "360 TV",
    channelSource: "https://turkmedya-live.ercdn.net/tv360/tv360.m3u8", // ✅ 200
    channelIconC: "https://i.imgur.com/agn47sQ.png",
    country: "tr", category: "news",
  },
  {
    channelID: "tele1tr",
    channelName: "Tele 1",
    channelSource: "https://tele1-live.ercdn.net/tele1/tele1.m3u8", // ✅ 200
    channelIconC: "https://upload.wikimedia.org/wikipedia/tr/4/43/Tele1_logosu.png",
    country: "tr", category: "news",
  },
  {
    channelID: "tv24tr",
    channelName: "24 TV",
    channelSource: "https://tv.ensonhaber.com/24tv/24tv.m3u8",
    channelIconC: "https://i.imgur.com/8FO41es.png",
    country: "tr", category: "news",
  },
  {
    channelID: "trt3",
    channelName: "TRT 3",
    channelSource: "https://tv-trt3.live.trt.com.tr/master.m3u8", // official TRT
    channelIconC: "https://i.imgur.com/JrWFwBd.png",
    country: "tr", category: "news",
  },

  // ─── TÜRKİYƏ — İDMAN ───
  {
    channelID: "trtspor",
    channelName: "TRT Spor",
    // ⚠️ 403 HEAD (TRT blocks bots) but ✅ works in browser
    channelSource: "https://tv-trtspor1.medya.trt.com.tr/master.m3u8",
    channelIconC: "https://i.imgur.com/6tv0zxh.png",
    country: "tr", category: "sport",
  },
  {
    channelID: "trtsporyz",
    channelName: "TRT Spor Yıldız",
    channelSource: "https://tv-trtspor2.medya.trt.com.tr/master.m3u8",
    channelIconC: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/TRT_Spor_Y%C4%B1ld%C4%B1z_Logo.svg/960px-TRT_Spor_Y%C4%B1ld%C4%B1z_Logo.svg.png",
    country: "tr", category: "sport",
  },
  {
    channelID: "aspor",
    channelName: "A Spor",
    channelSource: `${ERCN}/aspor/aspor.m3u8`,              // ✅ 200
    channelIconC: "https://i.imgur.com/ZhkZzLf.png",
    country: "tr", category: "sport",
  },
  {
    channelID: "htspor",
    channelName: "HT Spor",
    channelSource: `${CINER}/ht-spor/ht-spor.m3u8`,
    channelIconC: "https://www.htspor.com/images/manifest/social-share-logo.png",
    country: "tr", category: "sport",
  },
  {
    channelID: "tjktv",
    channelName: "TJK TV",
    channelSource: "https://tjktv-live.tjk.org/tjktv.m3u8",  // ✅ 200
    channelIconC: "https://i.imgur.com/3zHdkYG.png",
    country: "tr", category: "sport",
  },
  {
    channelID: "fbtv",
    channelName: "FB TV",
    channelSource: "http://1hskrdto.rocketcdn.com/fenerbahcetv.smil/playlist.m3u8", // ✅ 200
    channelIconC: "https://i.imgur.com/qBVqtYd.png",
    country: "tr", category: "sport",
  },

  // ─── TÜRKİYƏ — UŞAQ / ANİMASİYA ───
  {
    channelID: "trtcocuk",
    channelName: "TRT Çocuk",
    channelSource: "https://tv-trtcocuk.medya.trt.com.tr/master.m3u8", // ✅ 200
    channelIconC: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/TRT_%C3%87ocuk_logo_%282021%29.svg/960px-TRT_%C3%87ocuk_logo_%282021%29.svg.png",
    country: "tr", category: "kids",
  },
  {
    channelID: "minikago",
    channelName: "Minika GO",
    channelSource: `${ERCN}/minikago/minikago.m3u8`,         // ✅ 200
    channelIconC: "https://i.imgur.com/qIoipDq.png",
    country: "tr", category: "kids",
  },
  {
    channelID: "minikacoc",
    channelName: "Minika Çocuk",
    channelSource: `${ERCN}/minikago_cocuk/minikago_cocuk.m3u8`, // ✅ 200
    channelIconC: "https://i.imgur.com/VCywMTv.png",
    country: "tr", category: "kids",
  },
  {
    channelID: "trtdcocuk",
    channelName: "TRT Diyanet Çocuk",
    channelSource: "https://tv-trtdiyanetcocuk.medya.trt.com.tr/master.m3u8", // ✅ 200
    channelIconC: "https://i.imgur.com/8PmXz9t.png",
    country: "tr", category: "kids",
  },

  // ─── TÜRKİYƏ — MUSİQİ ───
  {
    channelID: "trtmuzik",
    channelName: "TRT Müzik",
    channelSource: "https://tv-trtmuzik.medya.trt.com.tr/master.m3u8", // ✅ 200
    channelIconC: "https://i.imgur.com/JgUzRH8.png",
    country: "tr", category: "music",
  },
  {
    channelID: "dreamturk",
    channelName: "Dream Türk",
    channelSource: "https://live.duhnet.tv/S2/HLS_LIVE/dreamturknp/playlist.m3u8", // ✅ 200
    channelIconC: "https://i.imgur.com/vJ8VaZi.png",
    country: "tr", category: "music",
  },
  {
    channelID: "kralpoptv",
    channelName: "Kral Pop TV",
    channelSource: `${DAIO_L}/kralpoptv/playlist.m3u8`,      // ✅ 200
    channelIconC: "https://i.imgur.com/ch365lh.png",
    country: "tr", category: "music",
  },
  {
    channelID: "number1tv",
    channelName: "Number 1 TV",
    channelSource: "https://b01c02nl.mediatriple.net/videoonlylive/mtkgeuihrlfwlive/broadcast_5c9e17cd59e8b.smil/playlist.m3u8", // ✅ 200
    channelIconC: "https://i.imgur.com/02cDIBi.png",
    country: "tr", category: "music",
  },
  {
    channelID: "number1turk",
    channelName: "Number 1 Türk",
    channelSource: "https://b01c02nl.mediatriple.net/videoonlylive/mtkgeuihrlfwlive/u_stream_5c9e198784bdc_1/playlist.m3u8",
    channelIconC: "https://i.imgur.com/18zjk3q.png",
    country: "tr", category: "music",
  },
  {
    channelID: "powertv",
    channelName: "Power TV",
    channelSource: "https://livetv.powerapp.com.tr/powerTV/powerhd.smil/playlist.m3u8", // ✅ 200
    channelIconC: "https://i.imgur.com/XSL1gd7.png",
    country: "tr", category: "music",
  },
  {
    channelID: "powerdance",
    channelName: "Power Dance",
    channelSource: "https://livetv.powerapp.com.tr/dance/dance.smil/playlist.m3u8", // ✅ 200
    channelIconC: "https://i.imgur.com/QpPteBO.png",
    country: "tr", category: "music",
  },
  {
    channelID: "number1ask",
    channelName: "Number 1 Aşk",
    channelSource: "https://b01c02nl.mediatriple.net/videoonlylive/mtkgeuihrlfwlive/u_stream_5c9e18f9cea15_1/playlist.m3u8", // ✅ 200
    channelIconC: "https://i.imgur.com/slwbux7.png",
    country: "tr", category: "music",
  },

  // ─── TÜRKİYƏ — BELGESEL / MƏDƏNİYYƏT ───
  {
    channelID: "trtbelgesel",
    channelName: "TRT Belgesel",
    // ⚠️ 403 HEAD (TRT blocks bots) but ✅ works in browser
    channelSource: "https://tv-trtbelgesel.medya.trt.com.tr/master.m3u8",
    channelIconC: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/TRT_Belgesel_logo_%282019-%29.svg/960px-TRT_Belgesel_logo_%282019-%29.svg.png",
    country: "tr", category: "culture",
  },
  {
    channelID: "trtavaz",
    channelName: "TRT Avaz",
    channelSource: "https://tv-trtavaz.medya.trt.com.tr/master.m3u8", // ✅ 200
    channelIconC: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/TRT_Avaz_logo.svg/960px-TRT_Avaz_logo.svg.png",
    country: "tr", category: "general",
  },
  {
    channelID: "trtturk",
    channelName: "TRT Türk",
    channelSource: "https://tv-trtturk.medya.trt.com.tr/master.m3u8", // ✅ 200
    channelIconC: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/TRT_T%C3%BCrk_logo.svg/960px-TRT_T%C3%BCrk_logo.svg.png",
    country: "tr", category: "general",
  },
  {
    channelID: "trteba",
    channelName: "TRT EBA",
    channelSource: "https://tv-e-okul01.medya.trt.com.tr/master.m3u8", // ✅ 200
    channelIconC: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/TRT_EBA_TV_logo.svg/960px-TRT_EBA_TV_logo.svg.png",
    country: "tr", category: "culture",
  },
  {
    channelID: "tbmmtv",
    channelName: "TBMM TV",
    channelSource: "https://meclistv-live.ercdn.net/meclistv/meclistv.m3u8", // ✅ 200
    channelIconC: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/TBMM_TV_logo.svg/960px-TBMM_TV_logo.svg.png",
    country: "tr", category: "general",
  },
];
