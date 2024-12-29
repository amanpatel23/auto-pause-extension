if (
  document.readyState === "interactive" ||
  document.readyState === "complete"
) {
  let pauseButton = document.querySelector('[data-purpose="pause-button"]');

  if (pauseButton) {
    pauseButton.click();
  }
}
