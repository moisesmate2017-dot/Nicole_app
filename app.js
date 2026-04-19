const body = document.body;
const customizePanel = document.getElementById('customize-panel');
const customizeToggle = document.getElementById('customize-toggle');
const closePanelBtn = document.getElementById('close-panel');
const themeButtons = document.querySelectorAll('.theme-btn');
const musicPlayer = document.getElementById('audio-player');
const musicPlayBtn = document.getElementById('music-play');
const musicNextBtn = document.getElementById('music-next');
const musicPrevBtn = document.getElementById('music-prev');
const volumeSlider = document.getElementById('volume-slider');
const musicTitle = document.getElementById('music-title');
const breathingCircle = document.getElementById('breathe-circle');
const breathingInstruction = document.getElementById('breathing-instruction');
const breathingSelector = document.getElementById('breathing-selector');

// --- ESTADO INICIAL ---
musicPlayer.volume = volumeSlider.value;
let currentBreatheType = 'simple';
let breathingCycleInterval;

// --- MÚSICA DE FONDO (USANDO MÚSICA DE STOCK SEGURA PARA EJEMPLOS) ---
// Para personalización, ella debería usar archivos locales o URL de archivos de audio reales.
const playlist = [
    { title: 'Naturaleza Suave', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
    { title: 'Lluvia Relajante', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
    { title: 'Océano Profundo', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3' },
];
let currentTrackIndex = 0;

const updateMusicPlayer = () => {
    const track = playlist[currentTrackIndex];
    musicPlayer.src = track.url;
    musicTitle.innerText = track.title;
    // Si la música estaba sonando, sigue sonando la siguiente pista
    if (!musicPlayer.paused) musicPlayer.play();
};

updateMusicPlayer(); // Inicializar

// --- EVENTOS DEL PANEL DE PERSONALIZACIÓN ---
customizeToggle.addEventListener('click', () => customizePanel.classList.toggle('open'));
closePanelBtn.addEventListener('click', () => customizePanel.classList.remove('open'));

// Cambiar Tema
themeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const newTheme = btn.dataset.theme;
        body.className = `theme-${newTheme}`;
        
        themeButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    });
});

// Controles de Música
musicPlayBtn.addEventListener('click', () => {
    if (musicPlayer.paused) {
        musicPlayer.play();
        musicPlayBtn.innerText = '⏸︎';
    } else {
        musicPlayer.pause();
        musicPlayBtn.innerText = '►';
    }
});

musicNextBtn.addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
    updateMusicPlayer();
    musicPlayer.play(); // Reproducir automáticamente la siguiente
    musicPlayBtn.innerText = '⏸︎';
});

musicPrevBtn.addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
    updateMusicPlayer();
    musicPlayer.play();
    musicPlayBtn.innerText = '⏸︎';
});

volumeSlider.addEventListener('input', () => {
    musicPlayer.volume = volumeSlider.value;
});

// Cambiar Tipo de Respiración
breathingSelector.addEventListener('change', () => {
    currentBreatheType = breathingSelector.value;
    clearInterval(breathingCycleInterval); // Reiniciar el ciclo
    initBreathing();
});

// --- LÓGICA DE RESPIRACIÓN MEJORADA ---
const setInhale = (time, text = 'Inhala...') => {
    breathingInstruction.innerText = text;
    breathingCircle.style.transform = 'scale(1.8)';
    breathingCircle.style.backgroundColor = 'var(--circle-inhale)';
    breathingCircle.style.transitionDuration = `${time}s`;
    breathingCircle.style.boxShadow = `0 0 50px ${getComputedStyle(body).getPropertyValue('--circle-inhale')}`;
};

const setExhale = (time, text = 'Exhala...') => {
    breathingInstruction.innerText = text;
    breathingCircle.style.transform = 'scale(1.0)';
    breathingCircle.style.backgroundColor = 'var(--circle-exhale)';
    breathingCircle.style.transitionDuration = `${time}s`;
    breathingCircle.style.boxShadow = `0 0 30px ${getComputedStyle(body).getPropertyValue('--circle-exhale')}`;
};

function initBreathing() {
    if (currentBreatheType === 'simple') {
        // Ciclo Original (4s / 4s)
        const runSimple = () => {
            setInhale(4);
            setTimeout(() => setExhale(4), 4000);
        }
        runSimple();
        breathingCycleInterval = setInterval(runSimple, 8000);
    } else if (currentBreatheType === 'box') {
        // Respiración de Caja (Inhala 4s / Sostén 4s / Exhala 4s / Sostén 4s)
        const runBox = () => {
            setInhale(4, 'Inhala... (4)');
            setTimeout(() => {
                breathingInstruction.innerText = 'Sostén... (4)';
            }, 4000);
            setTimeout(() => {
                setExhale(4, 'Exhala... (4)');
            }, 8000);
            setTimeout(() => {
                breathingInstruction.innerText = 'Sostén... (4)';
            }, 12000);
        }
        runBox();
        breathingCycleInterval = setInterval(runBox, 16000);
    }
}

// Iniciar el ciclo predeterminado
initBreathing();
