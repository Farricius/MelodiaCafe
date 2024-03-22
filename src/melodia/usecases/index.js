import { onYouTubeIframeAPIReady } from "./audio-music";
export { addNewTask } from "./add-task.js";

// Evita el error de los vídeos y el script
function loadYouTubeAPI() {
  window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
  const tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName("script")[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

loadYouTubeAPI();
