if (
  document.readyState === "interactive" ||
  document.readyState === "complete"
) {
  let playButton = document.querySelector('[data-purpose="play-button"]');

  if (playButton) {
    playButton.click();
  }
}
