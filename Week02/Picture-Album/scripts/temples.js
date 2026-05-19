// Footer: dynamic copyright year and last modified date
document.querySelector('#currentyear').textContent = new Date().getFullYear();
document.querySelector('#lastModified').textContent = `Last Modified: ${document.lastModified}`;

// Hamburger menu toggle
const hamburger = document.querySelector('#hamburger');
const nav = document.querySelector('#main-nav');

hamburger.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  hamburger.innerHTML = isOpen ? '&#10005;' : '&#9776;';
  hamburger.setAttribute('aria-expanded', isOpen);
});
