document.addEventListener("DOMContentLoaded", function () {
  const playButtons = document.querySelectorAll(".play-button");
  const rangeInputs = document.querySelectorAll('input[type="range"]');

  // Listeners

  playButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const audioId = this.dataset.id;
      toggleAmbienceAudio(audioId, this);
    });
  });

  rangeInputs.forEach((input) => {
    input.addEventListener("input", function () {
      const audioId = this.dataset.id;
      setVolume(audioId, this.value);
      this.style.background = `linear-gradient(to right, #82CFD0 0%, #82CFD0 ${this.value}%, #fff ${this.value}%, white 100%)`;
    });
  });
});

// Funciones
export function toggleAmbienceAudio(id, button) {
  const audio = document.getElementById(id);
  const playIcon = "▶️";
  const pauseIcon = "⏸";

  if (audio.paused) {
    setVolume(id, 25);
    audio.play();
    button.innerHTML = button.innerHTML.replace(playIcon, pauseIcon);
  } else {
    audio.pause();
    setVolume(id, 25);
    button.innerHTML = button.innerHTML.replace(pauseIcon, playIcon);
  }
}

export function setVolume(audioId, volume) {
  const audio = document.getElementById(audioId);
  if (audio) {
    audio.volume = volume / 100;
  }
}
