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

  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelectorAll('header nav a');

  if (menuToggle && header) {
    menuToggle.addEventListener('click', () => {
      const menuIsOpen = header.classList.toggle('menu-open');
      menuToggle.setAttribute('aria-expanded', String(menuIsOpen));
      menuToggle.setAttribute('aria-label', menuIsOpen ? 'Fechar menu' : 'Abrir menu');
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        if (header.classList.contains('menu-open')) {
          header.classList.remove('menu-open');
          menuToggle.setAttribute('aria-expanded', 'false');
          menuToggle.setAttribute('aria-label', 'Abrir menu');
        }
      });
    });
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