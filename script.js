// Nav scroll + menú móvil
const nav = document.getElementById('nav');
addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 40));
const toggle = document.getElementById('toggle'), links = document.getElementById('links');
toggle.onclick = () => { toggle.classList.toggle('open'); links.classList.toggle('open'); };
links.querySelectorAll('a').forEach(a => a.onclick = () => { toggle.classList.remove('open'); links.classList.remove('open'); });

// Animaciones al aparecer
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
}), { threshold: .15 });
document.querySelectorAll('.reveal').forEach((el, i) => { el.style.transitionDelay = (i % 4) * 0.1 + 's'; io.observe(el); });
addEventListener('load', () => document.body.classList.add('loaded'));

// Contadores
document.querySelectorAll('[data-count]').forEach(el => {
  const end = +el.dataset.count; let n = 0;
  const step = () => { n += Math.ceil(end / 60); if (n >= end) { el.textContent = end.toLocaleString() + '+'; return; } el.textContent = n; requestAnimationFrame(step); };
  setTimeout(step, 600);
});

// Testimonios
const slides = document.querySelectorAll('.slide'), dots = document.getElementById('dots'); let cur = 0;
slides.forEach((_, i) => { const b = document.createElement('button'); b.onclick = () => show(i); dots.appendChild(b); });
function show(i) { slides[cur].classList.remove('active'); dots.children[cur].classList.remove('on'); cur = i; slides[cur].classList.add('active'); dots.children[cur].classList.add('on'); }
show(0); setInterval(() => show((cur + 1) % slides.length), 5500);

// Cursor
const c = document.querySelector('.cursor');
addEventListener('mousemove', e => { c.style.left = e.clientX + 'px'; c.style.top = e.clientY + 'px'; });
document.querySelectorAll('a,button,.g,.card').forEach(el => {
  el.addEventListener('mouseenter', () => c.classList.add('big'));
  el.addEventListener('mouseleave', () => c.classList.remove('big'));
});

// Formulario -> WhatsApp
document.getElementById('form').onsubmit = e => {
  e.preventDefault();
  const d = new FormData(e.target);
  const msg = `Hola Joseline 💅 Soy ${d.get('nombre')}. Quiero agendar: ${d.get('servicio')} para el ${d.get('fecha')}. ${d.get('mensaje') || ''}`;
  window.open('https://wa.me/529372719302?text=' + encodeURIComponent(msg), '_blank');
};
document.getElementById('y').textContent = new Date().getFullYear();
