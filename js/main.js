document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('header');
  const SCROLL_LIMIT = 80;

  if (header) {
    const updateHeaderBackground = () => {
      if (window.scrollY > SCROLL_LIMIT) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };

    updateHeaderBackground();
    window.addEventListener('scroll', updateHeaderBackground);
  }

  const playerElement = document.getElementById('stream-player');
  if (playerElement && typeof Stream === 'function') {
    const player = Stream(playerElement);
    player.addEventListener('play', () => {
      console.log('playing!');
    });
    player.play().catch(() => {
      console.log('playback failed, muting to try again');
      player.muted = true;
      player.play();
    });
  }
});