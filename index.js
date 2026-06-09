// ── Audio Player ──
const audio    = document.getElementById('audioPlayer');
const playBtn  = document.getElementById('playPauseLabel');
const prevBtn  = document.getElementById('prevButton');
const nextBtn  = document.getElementById('nextButton');
const songName = document.getElementById('songName');

const songs = JSON.parse(audio.dataset.songs);

// ── Helpers ──
function updatePlayIcon() {
  playBtn.textContent = audio.paused ? '\u25B6' : '\u23F8'; // ▶ or ⏸
}

function setAudioSource(index) {
  audio.src = songs[index];
  audio.play();
  updatePlayIcon();
}

function getCurrentIndex() {
  return songs.findIndex(s => audio.currentSrc.endsWith(s));
}

function updateSongName() {
  const idx = getCurrentIndex();
  if (idx !== -1) {
    songName.textContent = songs[idx].split('/').pop();
  }
}

// ── Event Listeners ──
playBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
});

prevBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  const idx = getCurrentIndex();
  const prev = (idx - 1 + songs.length) % songs.length;
  setAudioSource(prev);
});

nextBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  const idx = getCurrentIndex();
  const next = (idx + 1) % songs.length;
  setAudioSource(next);
});

audio.addEventListener('play',  updatePlayIcon);
audio.addEventListener('pause', updatePlayIcon);
audio.addEventListener('ended', () => {
  const next = (getCurrentIndex() + 1) % songs.length;
  setAudioSource(next);
});
audio.addEventListener('loadedmetadata', updateSongName);

// ── Init ──
audio.volume = 0.1;
setAudioSource(0);
