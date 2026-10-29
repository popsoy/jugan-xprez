// Mobile nav toggle
const toggle = document.querySelector('.menu-toggle');
const nav = document.getElementById('nav');
toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('is-open');
  toggle.setAttribute('aria-expanded', open);
});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('is-open');
  toggle.setAttribute('aria-expanded', false);
}));

// Highlight the menu tab for the category in view
const tabs = [...document.querySelectorAll('.tabs a')];
const cats = tabs.map(t => document.querySelector(t.getAttribute('href')));
const tabBar = document.querySelector('.tabs__scroll');
const setActive = id => tabs.forEach(t => {
  const on = t.getAttribute('href') === '#' + id;
  t.classList.toggle('is-active', on);
  // scroll only the tab bar sideways, never the page
  if (on) tabBar.scrollTo({ left: t.offsetLeft - (tabBar.clientWidth - t.offsetWidth) / 2, behavior: 'smooth' });
});
const catObserver = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
}, { rootMargin: '-45% 0px -50% 0px' });
cats.forEach(c => catObserver.observe(c));

// Reveal on scroll
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

document.getElementById('year').textContent = new Date().getFullYear();
