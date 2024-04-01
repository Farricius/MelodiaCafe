// Necesaria para el reproductor falso
let player;

const musicGenresList = {
  lofi: { id: "jfKfPfyJRdk", name: "😴 Lofi Hip-Hop Radio" },
  techno: { id: "4xDzrJKXOOY", name: "🤖 Synth & Techno Radio" },
  rock: { id: "XnUNOaxw6bs", name: "🎸 Rock & Roll Radio" },
  merlina: { id: "YKPhbqjsL4s", name: "🖤 Dark Academia Radio" },
  latino: { id: "fO2TvUIIIqo", name: "🌴 Latino Mix Radio" },
  medieval: { id: "vK5VwVyxkbI", name: "🏰 Medieval Tavern Radio" },
  battle: { id: "AXH5hVVYe28", name: "🐲 Epic & Fantasy Radio" },
};

export function onYouTubeIframeAPIReady() {
  player = new YT.Player("player", {
    height: "0",
    width: "0",
    videoId: "",
    playerVars: {
      autoplay: 0,
      controls: 0,
      showinfo: 0,
      rel: 0,
      modestbranding: 1, // Borra logo y marca de agua
    },
    events: {
      onReady: onPlayerReady,
    },
  });
}

function onPlayerReady(event) {
  const toggleButtons = document.querySelectorAll(".audio-play");
  const volumeControl = document.getElementById("volumeControl");
  volumeControl.addEventListener("input", function () {
    player.setVolume(volumeControl.value);
    const value = this.value;
    this.style.background = `linear-gradient(to right, #82CFD0 0%, #82CFD0 ${value}%, #fff ${value}%, white 100%)`;
  });

  toggleButtons.forEach((toggleButton) => {
    toggleButton.addEventListener("click", function (event) {
      const buttonId = event.target.id;
      const clickedButton = event.currentTarget;

      if (player.getPlayerState() === 1) {
        clickedButton.textContent = "Turning off radio...";
      } else {
        clickedButton.textContent = "Loading radio...";
      }

      // Importante disabled para una futura pausa y bloquear mientras
      toggleButtons.forEach((button) => {
        button.disabled = button;
      });

      setTimeout(() => {
        // Radio está apagada:
        if (player.getPlayerState() === 1) {
          player.pauseVideo();
          console.log("#1 - Radio sound has stopped");
          clickedButton.textContent = musicGenresList[buttonId].name;
          toggleButtons.forEach((button) => {
            button.disabled = false;
          });
        } else {
          // Radio está sonando:
          const videoId = musicGenresList[buttonId].id;
          player.loadVideoById(videoId);
          player.playVideo();
          clickedButton.textContent = "Pause Radio";
          clickedButton.disabled = false;
          console.log("#2 - Radio sound is working");
        }
      }, 2000);
    });
  });
}
