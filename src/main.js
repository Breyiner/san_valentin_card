const envelope = document.getElementById('envelope');
const seal = document.getElementById('seal');
const memoryStack = document.getElementById('memoryStack');
const letter = document.getElementById('letter');

function toggleEnvelope() {
  envelope.dataset.state = (envelope.dataset.state === 'opened') ? 'sealed' : 'opened';
  
  if (envelope.dataset.state === 'sealed') {
    memoryStack.dataset.active = 'letter';
  }
}

seal.addEventListener('click', (e) => { 
  e.stopPropagation(); 
  toggleEnvelope(); 
});

memoryStack.addEventListener('click', (e) => {
  if (e.target.closest('[data-type="letter"]') && memoryStack.dataset.active === 'letter') {
    toggleEnvelope();
  }
  else if (e.target.closest('[data-type="letter"]') && memoryStack.dataset.active === 'song') {
    e.stopPropagation();
    toggleStack('letter');
    
    const audioEl = document.getElementById('audio');
    const playButton = document.getElementById('songPlayBtn');
    if (audioEl && playButton) {
      audioEl.pause();
      audioEl.currentTime = 0;
      playButton.classList.remove('playing');
      document.getElementById('songBarFill').style.width = '0%';
      document.getElementById('playerHandle').style.left = '0%';
    }
  }
});

document.addEventListener('click', (e) => {
  if (envelope.dataset.state === 'opened' && !envelope.contains(e.target)) {
    toggleEnvelope();
  }
});

letter.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') { 
    e.preventDefault(); 
    toggleEnvelope(); 
  }
});

const SONG = {
  title: 'La Melodía',
  artist: 'Para ti ❤️',
  coverUrl: '/assets/image.png',
  audioUrl: '/assets/cancion.mp3'
};

const letterCard = document.querySelector('.memo-card[data-type="letter"]');
const songCard = document.querySelector('.memo-card[data-type="song"]');

memoryStack.dataset.active = 'letter';

function toggleStack(to = 'song') {
  memoryStack.dataset.active = to;
  console.log(`Stack: ${to}`);
}

let spotifySetup = false;
function setupSpotify() {
  if (spotifySetup) return;
  
  document.getElementById('songCover').src = SONG.coverUrl;
  document.getElementById('songTitle').textContent = SONG.title;
  document.getElementById('songArtist').textContent = SONG.artist;
  document.getElementById('audio').src = SONG.audioUrl;
  
  spotifySetup = true;
}

const openSong = document.getElementById('openSong');
openSong?.addEventListener('click', (e) => {
  e.stopPropagation();
  setupSpotify();
  toggleStack('song');
});

songCard?.addEventListener('click', (e) => {
  if (memoryStack.dataset.active === 'letter') {
    e.stopPropagation();
    setupSpotify();
    toggleStack('song');
  }
});

if (window.matchMedia('(hover: hover)').matches) {
  let hoverTimeout;
  
  songCard?.addEventListener('mouseenter', () => {
    if (memoryStack.dataset.active === 'letter') {
      clearTimeout(hoverTimeout);
      hoverTimeout = setTimeout(() => {
        setupSpotify();
        toggleStack('song');
      }, 300);
    }
  });
  
  songCard?.addEventListener('mouseleave', () => {
    clearTimeout(hoverTimeout);
  });
  
  memoryStack?.addEventListener('mouseleave', () => {
    if (memoryStack.dataset.active === 'song') {
      toggleStack('letter');
    }
  });
}


const playBtn = document.getElementById('songPlayBtn');
const barFill = document.getElementById('songBarFill');
const playerHandle = document.getElementById('playerHandle');
const playerBar = document.getElementById('playerBar');
const likeBtn = document.getElementById('songLike');
const audio = document.getElementById('audio');
const prevBtn = document.getElementById('songPrev');
const nextBtn = document.getElementById('songNext');
const currentTimeEl = document.getElementById('currentTime');
const totalTimeEl = document.getElementById('totalTime');

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

playBtn?.addEventListener('click', (e) => {
  e.stopPropagation();
  if (audio.paused) {
    audio.play();
    playBtn.classList.add('playing');
  } else {
    audio.pause();
    playBtn.classList.remove('playing');
  }
});

audio?.addEventListener('timeupdate', () => {
  const pct = (audio.currentTime / audio.duration) * 100 || 0;
  barFill.style.width = `${pct}%`;
  playerHandle.style.left = `${pct}%`;
  
  if (currentTimeEl) {
    currentTimeEl.textContent = formatTime(audio.currentTime);
  }
});

audio?.addEventListener('loadedmetadata', () => {
  if (totalTimeEl) {
    totalTimeEl.textContent = '-' + formatTime(audio.duration);
  }
});

playerBar?.addEventListener('click', (e) => {
  const rect = playerBar.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const pct = x / rect.width;
  audio.currentTime = pct * audio.duration;
});

audio?.addEventListener('ended', () => {
  playBtn?.classList.remove('playing');
  barFill.style.width = '0%';
  playerHandle.style.left = '0%';
});

likeBtn?.addEventListener('click', (e) => {
  e.stopPropagation();
  likeBtn.classList.toggle('liked');
});

prevBtn?.addEventListener('click', (e) => {
  e.stopPropagation();
  audio.currentTime = 0;
});

nextBtn?.addEventListener('click', (e) => {
  e.stopPropagation();
  audio.currentTime = 0;
  audio.play();
  playBtn?.classList.add('playing');
});

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && memoryStack?.dataset.active === 'song') {
    toggleStack('letter');
  }
});

console.log('✨ Carta de San Valentín cargada correctamente');