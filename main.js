import Hls from 'hls.js';
import { channel_config } from './channels.js';

// ═══════════════════════════════════════
// FALLBACK LOGO GENERATOR
// ═══════════════════════════════════════
const COLORS = {
  'AZTV': ['#0092bd','#006a8e'], 'XƏZƏR TV': ['#1a237e','#0d47a1'],
  'İctimai TV': ['#1b5e20','#2e7d32'], 'ARB TV': ['#b71c1c','#7f0000'],
  'CBC TV': ['#0277bd','#01579b'], 'CBC Sport': ['#01579b','#003c6e'],
  'ATV': ['#880e4f','#560027'], 'Space TV': ['#4527a0','#311b92'],
  'Kanal S': ['#6a1b9a','#4a148c'], 'Kanal 35': ['#1b5e20','#0a3d0a'],
  'Real TV': ['#bf360c','#870000'], 'ELTV': ['#e65100','#bf360c'],
  'ARB GÜNƏŞ': ['#e65100','#bf360c'], 'Baku TV': ['#1565c0','#0d47a1'],
  'ARB 24': ['#b71c1c','#7f0000'], 'APA TV': ['#1565c0','#003c8f'],
  'İdman TV': ['#00695c','#004d40'], 'VIP HD': ['#4a148c','#311b92'],
  'Show Plus': ['#880e4f','#560027'], 'SH TV': ['#4527a0','#311b92'],
  'Vostok TV': ['#2e7d32','#1b5e20'], 'TMB TV': ['#00695c','#004d40'],
  'Biznes TV': ['#0277bd','#01579b'], 'Mədəniyyət TV': ['#880e4f','#4a148c'],
  'GunAz TV': ['#c62828','#7f0000'], 'Ayaz TV': ['#e65100','#bf360c'],
  'Dünya TV': ['#1565c0','#003c8f'], 'Kapaz TV': ['#00695c','#003d33'],
  'AnewZ': ['#b71c1c','#880e4f'], 'KN Music TV': ['#6a1b9a','#38006b'],
  'TRT 1': ['#c62828','#880e4f'], 'ATV': ['#c05500','#883000'],
  'Kanal D': ['#880e4f','#560027'], 'Show TV': ['#c62828','#7f0000'],
  'Star TV': ['#00695c','#004d40'], 'FOX TV': ['#e65100','#bf360c'],
  'TV 8': ['#1565c0','#003c8f'], 'Kanal 7': ['#6a1b9a','#4a148c'],
  'CNN Türk': ['#c62828','#7f0000'], 'NTV': ['#1565c0','#003c8f'],
  'Habertürk': ['#0277bd','#01579b'], 'Halk TV': ['#b71c1c','#7f0000'],
  'TRT Spor': ['#00695c','#003d33'], 'A Spor': ['#1565c0','#003c8f'],
  'TRT Çocuk': ['#e65100','#bf360c'], 'Minika GO': ['#6a1b9a','#4a148c'],
  'Disney Jr.': ['#1565c0','#003c8f'], 'TRT Müzik': ['#880e4f','#560027'],
  'Dream Türk': ['#4527a0','#311b92'], 'Kral Pop TV': ['#c62828','#880e4f'],
};
const PALETTE = [
  ['#c62828','#880e4f'], ['#1565c0','#0d47a1'], ['#6a1b9a','#4a148c'],
  ['#2e7d32','#1b5e20'], ['#e65100','#bf360c'], ['#00695c','#004d40'],
  ['#0277bd','#01579b'], ['#4527a0','#311b92'], ['#558b2f','#33691e'],
];

function makeFallback(name, size = '1.5rem') {
  const words = name.trim().split(/\s+/);
  const initials = words.length > 1
    ? (words[0][0] + words[words.length - 1][0]).toUpperCase()
    : name.slice(0, 2).toUpperCase();
  const [c1, c2] = COLORS[name] || PALETTE[name.charCodeAt(0) % PALETTE.length];
  const div = document.createElement('div');
  div.className = 'ch-logo ch-logo-fallback';
  Object.assign(div.style, {
    width: '100%', height: '100%',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    background: `linear-gradient(145deg, ${c1}ee, ${c2})`,
    borderRadius: '8px', fontSize: size, fontWeight: '900',
    letterSpacing: '-0.03em', color: 'rgba(255,255,255,0.95)',
    fontFamily: 'Inter, sans-serif',
    textShadow: `0 1px 10px ${c1}88`,
    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.18)',
  });
  div.textContent = initials;
  return div;
}

// ═══════════════════════════════════════
// CHANNEL DATA
// ═══════════════════════════════════════
const channels = channel_config.map(ch => ({
  country: 'az', category: 'general', ...ch,
}));

// ═══════════════════════════════════════
// DOM REFS
// ═══════════════════════════════════════
const grid            = document.getElementById('channelsGrid');
const searchInput     = document.getElementById('searchInput');
const searchClear     = document.getElementById('searchClear');
const sectionTitle    = document.getElementById('sectionTitle');
const channelCount    = document.getElementById('channelCount');
const emptyState      = document.getElementById('emptyState');
const liveCountEl     = document.getElementById('liveCount');
const statCount       = document.getElementById('statCount');
const playerModal     = document.getElementById('playerModal');
const playerBackdrop  = document.getElementById('playerBackdrop');
const playerContainer = document.getElementById('playerContainer');
const playerHeader    = document.getElementById('playerHeader');
const playerControls  = document.getElementById('playerControls');
const playerTitle     = document.getElementById('playerTitle');
const playerLogoWrap  = document.getElementById('playerLogoWrap');
const playerBuffering = document.getElementById('playerBuffering');
const playerError     = document.getElementById('playerError');
const playerErrorMsg  = document.getElementById('playerErrorMsg');
const retryCountdown  = document.getElementById('retryCountdown');
const hlsVideo        = document.getElementById('hlsVideo');
const closePlayer     = document.getElementById('closePlayer');
const btnFullscreen   = document.getElementById('btnFullscreen');
const btnFs2          = document.getElementById('btnFs2');
const fsExpand        = document.getElementById('fsIconExpand');
const fsCollapse      = document.getElementById('fsIconCollapse');
const btnPlayPause    = document.getElementById('btnPlayPause');
const iconPlay        = document.getElementById('iconPlay');
const iconPause       = document.getElementById('iconPause');
const btnMute         = document.getElementById('btnMute');
const iconVol         = document.getElementById('iconVol');
const iconMute        = document.getElementById('iconMute');
const volumeSlider    = document.getElementById('volumeSlider');
const volFill         = document.getElementById('volFill');
const btnPip          = document.getElementById('btnPip');
const btnRetry        = document.getElementById('btnRetry');
const videoClickOvl   = document.getElementById('videoClickOverlay');
const playFlash       = document.getElementById('playFlash');
const flashIconPlay   = document.getElementById('flashIconPlay');
const flashIconPause  = document.getElementById('flashIconPause');
const qualityBadge    = document.getElementById('qualityBadge');
const scrollTopBtn    = document.getElementById('scrollTop');
const toastCont       = document.getElementById('toastContainer');
const header          = document.getElementById('header');
const recentSection   = document.getElementById('recentSection');
const recentGrid      = document.getElementById('recentGrid');
const btnShortcuts    = document.getElementById('btnShortcuts');
const shortcutsModal  = document.getElementById('shortcutsModal');
const shortcutsBd     = document.getElementById('shortcutsBackdrop');
const closeShortcuts  = document.getElementById('closeShortcuts');

// ═══════════════════════════════════════
// STATE
// ═══════════════════════════════════════
let hls             = null;
let activeFilter    = 'all';
let searchQuery     = '';
let currentChannel  = null;
let isFullscreen    = false;
let controlsTimeout = null;
let retryTimer      = null;
let retryCount      = 0;
let activeCard      = null;
let searchDebounce  = null;

const MAX_RECENT = 8;

// ═══════════════════════════════════════
// INIT
// ═══════════════════════════════════════
liveCountEl.textContent = channels.length;

// Animated counter for statCount
function animateCount(el, target, duration = 1200) {
  const start = performance.now();
  const update = (now) => {
    const p = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(ease * target);
    if (p < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}
setTimeout(() => animateCount(statCount, channels.length), 400);

// ═══════════════════════════════════════
// TOAST SYSTEM
// ═══════════════════════════════════════
function showToast(msg, type = 'info', duration = 3500) {
  const t = document.createElement('div');
  t.className = `toast toast-${type}`;
  const icons = {
    error:   `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#e63946" stroke-width="2.5" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`,
    success: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2.5" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>`,
    info:    `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="2.5" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
  };
  t.innerHTML = `${icons[type] || ''}${msg}`;
  toastCont.appendChild(t);
  setTimeout(() => {
    t.classList.add('toast-out');
    t.addEventListener('animationend', () => t.remove());
  }, duration);
}

// ═══════════════════════════════════════
// RECENTLY WATCHED (localStorage)
// ═══════════════════════════════════════
function getRecent() {
  try { return JSON.parse(localStorage.getItem('az_recent') || '[]'); } catch { return []; }
}
function saveRecent(ids) {
  try { localStorage.setItem('az_recent', JSON.stringify(ids)); } catch {}
}
function addRecent(ch) {
  let ids = getRecent().filter(id => id !== ch.channelID);
  ids.unshift(ch.channelID);
  if (ids.length > MAX_RECENT) ids = ids.slice(0, MAX_RECENT);
  saveRecent(ids);
  renderRecent();
}
function renderRecent() {
  const ids = getRecent();
  const list = ids.map(id => channels.find(c => c.channelID === id)).filter(Boolean);
  if (list.length === 0) { recentSection.classList.add('hidden'); return; }
  recentSection.classList.remove('hidden');
  recentGrid.innerHTML = '';
  list.forEach(ch => {
    const chip = document.createElement('div');
    chip.className = 'recent-chip';
    if (ch.channelIconC) {
      chip.innerHTML = `<img src="${ch.channelIconC}" alt="" onerror="this.remove()"><span>${ch.channelName}</span>`;
    } else {
      const [c1] = COLORS[ch.channelName] || PALETTE[ch.channelName.charCodeAt(0) % PALETTE.length];
      chip.innerHTML = `<div class="recent-chip-fb" style="background:${c1}">${ch.channelName.slice(0,2).toUpperCase()}</div><span>${ch.channelName}</span>`;
    }
    chip.addEventListener('click', () => openPlayer(ch));
    recentGrid.appendChild(chip);
  });
}
renderRecent();

// ═══════════════════════════════════════
// FAVORITES (localStorage)
// ═══════════════════════════════════════
const FAV_KEY = 'az_favorites';
function getFavorites()  { try { return JSON.parse(localStorage.getItem(FAV_KEY) || '[]'); } catch { return []; } }
function saveFavorites(a){ try { localStorage.setItem(FAV_KEY, JSON.stringify(a)); } catch {} }
function isFavorite(id)  { return getFavorites().includes(id); }
function toggleFavorite(id) {
  let favs = getFavorites();
  if (favs.includes(id)) { favs = favs.filter(f => f !== id); showToast('Favorilərdən çıxarıldı', 'info', 2000); }
  else { favs.push(id); showToast('Favorilərə əlavə edildi ⭐', 'success', 2000); }
  saveFavorites(favs);
  updateFavCount();
  if (activeFilter === 'fav') refresh();
}
function updateFavCount() {
  const cnt = getFavorites().length;
  const el = document.getElementById('favCnt');
  if (el) el.textContent = cnt > 0 ? cnt : '';
}
updateFavCount();

// ═══════════════════════════════════════
// RENDER CHANNELS
// ═══════════════════════════════════════
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
}, { threshold: 0.08, rootMargin: '40px' });

function renderChannels(list) {
  observer.disconnect();
  grid.innerHTML = '';
  emptyState.classList.toggle('hidden', list.length > 0);
  channelCount.textContent = `${list.length} kanal`;

  const frag = document.createDocumentFragment();

  list.forEach((ch, i) => {
    const card = document.createElement('div');
    card.className = 'ch-card';
    card.style.animationDelay = `${Math.min(i * 25, 400)}ms`;
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', `${ch.channelName} kanalını izlə`);
    card.dataset.id = ch.channelID;

    const flag = ch.country === 'tr'
      ? `<div class="ch-flag"><img src="https://flagcdn.com/w20/tr.png" alt="TR"/></div>`
      : `<div class="ch-flag"><img src="https://flagcdn.com/w20/az.png" alt="AZ"/></div>`;

    const fav = isFavorite(ch.channelID);

    card.innerHTML = `
      <div class="ch-live-badge"><span class="live-dot" style="width:5px;height:5px"></span> CANLI</div>
      <button class="ch-fav-btn ${fav ? 'active' : ''}" data-fav="${ch.channelID}" title="${fav ? 'Favorilərdən çıxar' : 'Favorilərdə saxla'}" aria-label="Favori">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="${fav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
      </button>
      <div class="ch-logo-wrap" id="clw-${ch.channelID}"></div>
      <span class="ch-name">${ch.channelName}</span>
      <div class="ch-play-overlay">
        <div class="ch-play-btn">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M5 3l14 9-14 9V3z"/></svg>
        </div>
      </div>
      <div class="ch-playing-badge">▶ İZLƏNİR</div>
      ${flag}
    `;

    // Logo
    const wrap = card.querySelector(`#clw-${ch.channelID}`);
    if (ch.channelIconC) {
      const img = document.createElement('img');
      img.className = 'ch-logo';
      img.src = ch.channelIconC;
      img.alt = ch.channelName;
      img.loading = 'lazy';
      img.onerror = () => { img.remove(); wrap.appendChild(makeFallback(ch.channelName)); };
      wrap.appendChild(img);
    } else {
      wrap.appendChild(makeFallback(ch.channelName));
    }

    // Favorite button handler (stopPropagation so card doesn't open)
    card.querySelector('[data-fav]').addEventListener('click', e => {
      e.stopPropagation();
      toggleFavorite(ch.channelID);
      const now = isFavorite(ch.channelID);
      const btn = e.currentTarget;
      btn.classList.toggle('active', now);
      btn.title = now ? 'Favorilərdən çıxar' : 'Favorilərdə saxla';
      const svg = btn.querySelector('svg');
      if (svg) svg.setAttribute('fill', now ? 'currentColor' : 'none');
    });

    if (currentChannel?.channelID === ch.channelID) {
      card.classList.add('is-playing');
      activeCard = card;
    }

    const open = () => openPlayer(ch);
    card.addEventListener('click', open);
    card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });

    frag.appendChild(card);
    observer.observe(card);
  });

  grid.appendChild(frag);
}

function getFiltered() {
  if (activeFilter === 'fav') {
    const favs = getFavorites();
    return channels.filter(ch => favs.includes(ch.channelID) &&
      (!searchQuery || ch.channelName.toLowerCase().includes(searchQuery)));
  }
  return channels.filter(ch => {
    const mF = activeFilter === 'all' || ch.country === activeFilter || ch.category === activeFilter;
    const mS = !searchQuery || ch.channelName.toLowerCase().includes(searchQuery);
    return mF && mS;
  });
}

const LABELS = {
  all:     'Canlı Kanallar',
  az:      '🇦🇿 Azərbaycan Kanalları',
  tr:      '🇹🇷 Türkiyə Kanalları',
  news:    '📰 Xəbər Kanalları',
  sport:   '⚽ İdman Kanalları',
  kids:    '🎠 Uşaq Kanalları',
  music:   '🎵 Musiqi Kanalları',
  culture: '🎬 Belgesel & Mədəniyyət',
  fav:     '⭐ Favori Kanallar',
};

function refresh() {
  const filtered = getFiltered();
  sectionTitle.textContent = searchQuery ? `"${searchQuery}" — nəticələr` : (LABELS[activeFilter] || 'Canlı Kanallar');
  renderChannels(filtered);
}

// ═══════════════════════════════════════
// FILTER + SEARCH
// ═══════════════════════════════════════
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeFilter = btn.dataset.filter;
    refresh();
  });
});

searchInput.addEventListener('input', () => {
  clearTimeout(searchDebounce);
  searchQuery = searchInput.value.trim().toLowerCase();
  searchClear.classList.toggle('hidden', !searchQuery);
  searchDebounce = setTimeout(refresh, 180);
});

searchClear.addEventListener('click', () => {
  searchInput.value = '';
  searchQuery = '';
  searchClear.classList.add('hidden');
  refresh();
  searchInput.focus();
});

// ═══════════════════════════════════════
// OPEN PLAYER
// ═══════════════════════════════════════
function openPlayer(ch) {
  currentChannel = ch;
  playerTitle.textContent = ch.channelName;

  // Update browser tab title
  document.title = `📺 ${ch.channelName} — AzStream`;

  // Mark card
  if (activeCard) activeCard.classList.remove('is-playing');
  activeCard = grid.querySelector(`[data-id="${ch.channelID}"]`);
  if (activeCard) activeCard.classList.add('is-playing');

  // Logo
  playerLogoWrap.innerHTML = '';
  if (ch.channelIconC) {
    const img = document.createElement('img');
    img.alt = ch.channelName;
    img.src = ch.channelIconC;
    img.style.cssText = 'max-width:88%;max-height:88%;object-fit:contain;';
    img.onerror = () => { img.remove(); playerLogoWrap.appendChild(makeFallback(ch.channelName, '0.6rem')); };
    playerLogoWrap.appendChild(img);
  } else {
    playerLogoWrap.appendChild(makeFallback(ch.channelName, '0.6rem'));
  }

  // Show modal
  playerModal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  playerError.classList.add('hidden');
  playerBuffering.classList.add('show');
  qualityBadge.style.display = 'none';

  // Add to recent
  addRecent(ch);

  loadStream(ch.channelSource);
}

// ═══════════════════════════════════════
// LOAD STREAM
// ═══════════════════════════════════════
function loadStream(src) {
  if (hls) { hls.destroy(); hls = null; }
  clearRetryTimer();
  hlsVideo.pause();
  hlsVideo.src = '';
  playerError.classList.add('hidden');
  playerBuffering.classList.add('show');
  retryCount = 0;

  if (Hls.isSupported()) {
    hls = new Hls({
      maxBufferLength: 60,
      maxMaxBufferLength: 120,
      maxBufferSize: 80 * 1000 * 1000,
      maxBufferHole: 0.5,
      nudgeMaxRetry: 5,
      manifestLoadingTimeOut: 15000,
      manifestLoadingMaxRetry: 6,
      manifestLoadingRetryDelay: 2000,
      levelLoadingTimeOut: 15000,
      levelLoadingMaxRetry: 6,
      fragLoadingTimeOut: 20000,
      fragLoadingMaxRetry: 6,
      fragLoadingRetryDelay: 1500,
      lowLatencyMode: false,
      liveSyncDurationCount: 3,
      liveMaxLatencyDurationCount: 10,
      enableWorker: true,
      startLevel: -1,
    });

    hls.loadSource(src);
    hls.attachMedia(hlsVideo);

    hls.on(Hls.Events.MANIFEST_PARSED, (_, data) => {
      playerBuffering.classList.remove('show');
      const levels = data.levels;
      if (levels?.length) {
        const maxH = Math.max(...levels.map(l => l.height || 0));
        if (maxH >= 1080)      { qualityBadge.textContent = 'FHD'; qualityBadge.style.display = ''; }
        else if (maxH >= 720)  { qualityBadge.textContent = 'HD'; qualityBadge.style.display = ''; }
        else if (maxH >= 480)  { qualityBadge.textContent = 'SD'; qualityBadge.style.display = ''; }
      }
      hlsVideo.play().catch(() => updatePlayIcon());
      updatePlayIcon();
    });

    hls.on(Hls.Events.FRAG_BUFFERED, () => playerBuffering.classList.remove('show'));

    let mediaErrCount = 0;
    hls.on(Hls.Events.ERROR, (_, data) => {
      if (!data.fatal) return;
      if (data.type === Hls.ErrorTypes.NETWORK_ERROR) {
        retryCount++;
        if (retryCount <= 4) {
          showToast(`Bağlantı xətası — ${retryCount}. cəhd...`, 'error', 2500);
          hls.startLoad();
        } else {
          showError('Yayım yüklənə bilmədi. Şəbəkə bağlantısını yoxlayın.', true);
        }
      } else if (data.type === Hls.ErrorTypes.MEDIA_ERROR && mediaErrCount < 3) {
        mediaErrCount++;
        hls.recoverMediaError();
      } else {
        showError('Yayım oxutula bilmədi.', true);
      }
    });

  } else if (hlsVideo.canPlayType('application/vnd.apple.mpegurl')) {
    hlsVideo.src = src;
    hlsVideo.addEventListener('loadedmetadata', () => {
      playerBuffering.classList.remove('show');
      hlsVideo.play().catch(() => {});
      updatePlayIcon();
    }, { once: true });
    hlsVideo.addEventListener('error', () => showError('Yayım yüklənə bilmədi.', true), { once: true });
  } else {
    showError('Brauzerin HLS dəstəkləmir.');
  }
}

function showError(msg, autoRetry = false) {
  playerBuffering.classList.remove('show');
  playerErrorMsg.textContent = msg;
  playerError.classList.remove('hidden');
  if (autoRetry) scheduleRetry();
}

function scheduleRetry() {
  let t = 8;
  clearRetryTimer();
  retryCountdown.textContent = `${t}s sonra yenidən cəhd ediləcək...`;
  retryTimer = setInterval(() => {
    t--;
    if (t <= 0) {
      clearRetryTimer();
      if (currentChannel) { playerError.classList.add('hidden'); loadStream(currentChannel.channelSource); }
    } else {
      retryCountdown.textContent = `${t}s sonra yenidən cəhd ediləcək...`;
    }
  }, 1000);
}
function clearRetryTimer() {
  if (retryTimer) { clearInterval(retryTimer); retryTimer = null; }
  retryCountdown.textContent = '';
}

btnRetry.addEventListener('click', () => {
  clearRetryTimer();
  if (currentChannel) { playerError.classList.add('hidden'); loadStream(currentChannel.channelSource); }
});

// ═══════════════════════════════════════
// CLOSE PLAYER
// ═══════════════════════════════════════
function closeVideo() {
  if (isFullscreen) exitFullscreen();
  playerModal.classList.add('hidden');
  document.body.style.overflow = '';
  document.title = 'AzStream — Canlı TV';
  if (hls) { hls.destroy(); hls = null; }
  clearRetryTimer();
  hlsVideo.pause();
  hlsVideo.src = '';
  playerBuffering.classList.remove('show');
  playerError.classList.add('hidden');
  playerLogoWrap.innerHTML = '';
  qualityBadge.style.display = 'none';
  // Smooth scroll to the card that was playing
  if (activeCard) {
    setTimeout(() => activeCard?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 120);
    activeCard.classList.remove('is-playing');
    activeCard = null;
  }
  currentChannel = null;
}

closePlayer.addEventListener('click', closeVideo);
playerBackdrop.addEventListener('click', closeVideo);

// ═══════════════════════════════════════
// PLAY / PAUSE
// ═══════════════════════════════════════
function updatePlayIcon() {
  const p = hlsVideo.paused;
  iconPlay.style.display  = p ? '' : 'none';
  iconPause.style.display = p ? 'none' : '';
}

function flashPlayPause(paused) {
  flashIconPlay.style.display  = paused ? '' : 'none';
  flashIconPause.style.display = paused ? 'none' : '';
  playFlash.classList.add('show');
  setTimeout(() => playFlash.classList.remove('show'), 600);
}

function togglePlay() {
  const wasPaused = hlsVideo.paused;
  if (wasPaused) hlsVideo.play().catch(() => {});
  else hlsVideo.pause();
  updatePlayIcon();
  flashPlayPause(!wasPaused);
}

btnPlayPause.addEventListener('click', togglePlay);
videoClickOvl.addEventListener('click', togglePlay);
hlsVideo.addEventListener('play', updatePlayIcon);
hlsVideo.addEventListener('pause', updatePlayIcon);
hlsVideo.addEventListener('waiting', () => playerBuffering.classList.add('show'), { passive: true });
hlsVideo.addEventListener('playing', () => { playerBuffering.classList.remove('show'); updatePlayIcon(); }, { passive: true });
hlsVideo.addEventListener('canplay', () => playerBuffering.classList.remove('show'), { passive: true });

// ═══════════════════════════════════════
// VOLUME
// ═══════════════════════════════════════
function updateVolFill() {
  const v = hlsVideo.muted ? 0 : hlsVideo.volume;
  volFill.style.width = `${v * 100}%`;
}

function updateMuteIcon() {
  const m = hlsVideo.muted || hlsVideo.volume === 0;
  iconVol.style.display  = m ? 'none' : '';
  iconMute.style.display = m ? '' : 'none';
  updateVolFill();
}

btnMute.addEventListener('click', () => { hlsVideo.muted = !hlsVideo.muted; updateMuteIcon(); });

volumeSlider.addEventListener('input', () => {
  hlsVideo.volume = parseFloat(volumeSlider.value);
  hlsVideo.muted = hlsVideo.volume === 0;
  updateMuteIcon();
});

// ═══════════════════════════════════════
// FULLSCREEN
// ═══════════════════════════════════════
function enterFullscreen() {
  isFullscreen = true;
  playerContainer.classList.add('is-fullscreen');
  fsExpand.style.display = 'none';
  fsCollapse.style.display = '';
  document.documentElement.requestFullscreen?.().catch(() => {});
}
function exitFullscreen() {
  isFullscreen = false;
  playerContainer.classList.remove('is-fullscreen');
  fsExpand.style.display = '';
  fsCollapse.style.display = 'none';
  if (document.fullscreenElement) document.exitFullscreen?.().catch(() => {});
  showControls();
}
function toggleFullscreen() { if (isFullscreen) exitFullscreen(); else enterFullscreen(); }

btnFullscreen.addEventListener('click', toggleFullscreen);
btnFs2.addEventListener('click', toggleFullscreen);
document.addEventListener('fullscreenchange', () => { if (!document.fullscreenElement && isFullscreen) exitFullscreen(); });

// ═══════════════════════════════════════
// PiP
// ═══════════════════════════════════════
btnPip.addEventListener('click', async () => {
  try {
    if (document.pictureInPictureElement) await document.exitPictureInPicture();
    else if (hlsVideo.requestPictureInPicture) {
      await hlsVideo.requestPictureInPicture();
      showToast('Mini ekran açıldı', 'success', 2000);
    }
  } catch (e) { showToast('Mini ekran dəstəklənmir', 'error', 2000); }
});

// ═══════════════════════════════════════
// AUTO-HIDE CONTROLS IN FULLSCREEN
// ═══════════════════════════════════════
function showControls() {
  playerHeader.style.opacity = '1';
  playerControls.style.opacity = '1';
  playerContainer.style.cursor = '';
  clearTimeout(controlsTimeout);
  if (isFullscreen) {
    controlsTimeout = setTimeout(() => {
      playerHeader.style.opacity = '0';
      playerControls.style.opacity = '0';
      playerContainer.style.cursor = 'none';
    }, 3500);
  }
}

playerContainer.addEventListener('mousemove', showControls, { passive: true });
playerContainer.addEventListener('touchstart', showControls, { passive: true });

// ═══════════════════════════════════════
// KEYBOARD SHORTCUTS
// ═══════════════════════════════════════
document.addEventListener('keydown', e => {
  const modal   = !playerModal.classList.contains('hidden');
  const shorts  = !shortcutsModal.classList.contains('hidden');
  const inInput = document.activeElement.tagName === 'INPUT';

  if (e.key === '?' || (e.key === '/' && !inInput && !modal)) {
    if (!modal) { shortcutsModal.classList.toggle('hidden'); return; }
  }

  if (shorts && e.key === 'Escape') { shortcutsModal.classList.add('hidden'); return; }

  if (e.key === 'Escape') {
    if (modal) { if (isFullscreen) exitFullscreen(); else closeVideo(); }
    else { searchInput.value = ''; searchQuery = ''; searchClear.classList.add('hidden'); refresh(); }
    return;
  }

  if (modal) {
    switch (e.key) {
      case 'f': case 'F': toggleFullscreen(); showControls(); break;
      case ' ':
        e.preventDefault();
        togglePlay();
        showControls();
        break;
      case 'm': case 'M':
        hlsVideo.muted = !hlsVideo.muted;
        updateMuteIcon();
        break;
      case 'p': case 'P': btnPip.click(); break;
      case 'ArrowUp':
        e.preventDefault();
        hlsVideo.volume = Math.min(1, hlsVideo.volume + 0.1);
        volumeSlider.value = hlsVideo.volume;
        hlsVideo.muted = false;
        updateMuteIcon();
        break;
      case 'ArrowDown':
        e.preventDefault();
        hlsVideo.volume = Math.max(0, hlsVideo.volume - 0.1);
        volumeSlider.value = hlsVideo.volume;
        updateMuteIcon();
        break;
    }
    return;
  }

  // Open search
  if (!inInput && !e.ctrlKey && !e.metaKey && !e.altKey && e.key.length === 1) {
    searchInput.focus();
  }
});

// ═══════════════════════════════════════
// SHORTCUTS MODAL
// ═══════════════════════════════════════
btnShortcuts.addEventListener('click', () => shortcutsModal.classList.toggle('hidden'));
closeShortcuts.addEventListener('click', () => shortcutsModal.classList.add('hidden'));
shortcutsBd.addEventListener('click', () => shortcutsModal.classList.add('hidden'));

// ═══════════════════════════════════════
// SCROLL: header shadow + scroll-to-top
// ═══════════════════════════════════════
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  header.classList.toggle('scrolled', y > 10);
  scrollTopBtn.classList.toggle('hidden', y < 400);
}, { passive: true });

scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ═══════════════════════════════════════
// INIT RENDER
// ═══════════════════════════════════════

// Show skeletons first for instant perceived load
(function showSkeletons(n = 24) {
  const frag = document.createDocumentFragment();
  for (let i = 0; i < n; i++) {
    const s = document.createElement('div');
    s.className = 'ch-skeleton';
    s.style.animationDelay = `${i * 0.05}s`;
    frag.appendChild(s);
  }
  grid.appendChild(frag);
})();

// Then render real channels on next tick
requestAnimationFrame(() => {
  refresh();
  updateVolFill();
  console.info(
    `%cAzStream %c${channels.length} kanal yükləndi ✓`,
    'color:#e63946;font-weight:900;font-size:1rem',
    'color:#22c55e;font-size:.9rem'
  );
});
