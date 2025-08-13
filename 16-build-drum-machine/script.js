// Drum pad data for easy reference
const drumData = {
  Q: 'Heater 1',
  W: 'Heater 2',
  E: 'Heater 3',
  A: 'Heater 4',
  S: 'Clap',
  D: 'Open-HH',
  Z: "Kick-n'-Hat",
  X: 'Kick',
  C: 'Closed-HH',
};

const display = document.getElementById('display');
const drumPads = document.querySelectorAll('.drum-pad');

// Function to play sound and update display
function playSound(key) {
  const audio = document.getElementById(key);
  const pad = audio.parentElement;

  if (audio) {
    // Reset audio to beginning for rapid successive plays
    audio.currentTime = 0;
    audio.play();

    // Update display with sound name
    display.textContent = drumData[key];
    display.style.color = '#ff6b6b';
    display.style.textShadow = '0 0 15px rgba(255, 107, 107, 0.8)';

    // Add visual feedback to pad
    pad.classList.add('active');
    pad.classList.add('pulse');

    // Remove active class after animation
    setTimeout(() => {
      pad.classList.remove('active');
      pad.classList.remove('pulse');
      display.style.color = '#00ff88';
      display.style.textShadow = '0 0 10px rgba(0, 255, 136, 0.5)';
    }, 150);
  }
}

// Add click event listeners to drum pads
drumPads.forEach((pad) => {
  pad.addEventListener('click', () => {
    const key = pad.textContent.trim();
    playSound(key);
  });
});

// Add keyboard event listener
document.addEventListener('keydown', (event) => {
  const key = event.key.toUpperCase();
  if (drumData[key]) {
    playSound(key);
  }
});

// Preload all audio files for better performance
document.addEventListener('DOMContentLoaded', () => {
  const audioElements = document.querySelectorAll('.clip');
  audioElements.forEach((audio) => {
    audio.load();
  });
});

// Add some extra visual flair
setInterval(() => {
  if (display.textContent === 'Ready to make some beats!') {
    display.style.textShadow = `0 0 10px rgba(0, 255, 136, ${
      0.3 + Math.sin(Date.now() * 0.003) * 0.2
    })`;
  }
}, 100);
