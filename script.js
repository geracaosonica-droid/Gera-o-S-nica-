const audio = new Audio();
let isPlaying = false;
let currentTrack = 0;

// === SUBSTITUA PELOS SEUS LINKS MP3 REAIS DO TERABOX ===
const playlist = [
  { name: "Geração Sônica – Live Mix", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
  { name: "Hits do Momento", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" }
];

const playBtn = document.getElementById('playBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const volumeSlider = document.getElementById('volumeSlider');
const trackInfo = document.getElementById('trackInfo');
const equalizerBars = document.querySelectorAll('.bar');

function updateTrackInfo() {
  trackInfo.innerText = playlist[currentTrack]?.name || "Geração Sônica – Ao Vivo";
}

function loadTrack(index) {
  audio.pause();
  isPlaying = false;
  playBtn.innerText = '▶️';
  audio.src = playlist[index]?.url;
  audio.load();
  updateTrackInfo();
  if (isPlaying) play();
}

function play() {
  audio.play().then(() => {
    isPlaying = true;
    playBtn.innerText = '⏸️';
  }).catch(e => console.warn("Erro ao reproduzir:", e));
}

function pause() {
  audio.pause();
  isPlaying = false;
  playBtn.innerText = '▶️';
}

function togglePlay() {
  if (isPlaying) pause();
  else play();
}

function nextTrack() {
  currentTrack = (currentTrack + 1) % playlist.length;
  loadTrack(currentTrack);
  play();
}

function prevTrack() {
  currentTrack = (currentTrack - 1 + playlist.length) % playlist.length;
  loadTrack(currentTrack);
  play();
}

audio.volume = volumeSlider.value;
audio.onended = () => nextTrack();

volumeSlider.addEventListener('input', (e) => {
  audio.volume = parseFloat(e.target.value);
});

playBtn.addEventListener('click', togglePlay);
nextBtn.addEventListener('click', nextTrack);
prevBtn.addEventListener('click', prevTrack);

// equalizador visual
setInterval(() => {
  if (!isPlaying) {
    equalizerBars.forEach(bar => bar.style.height = '12px');
    return;
  }
  equalizerBars.forEach(bar => {
    const h = 8 + Math.random() * 36;
    bar.style.height = `${h}px`;
  });
}, 120);

loadTrack(0);