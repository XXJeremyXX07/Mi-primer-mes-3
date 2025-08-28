// Contador de días juntos
const fechaInicio = new Date('2025-07-28');
const hoy = new Date();
const diff = hoy - fechaInicio;
const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
document.getElementById('dias').textContent = `¡${dias} días de amor juntos!`;

// Fondo animado de corazones en canvas
const canvas = document.getElementById('fondoCorazones');
const ctx = canvas.getContext('2d');
let heartsBG = [];
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();
function randomColor() {
  const colors = ["#ff3e6c","#ffb3c6","#fe8c00","#ffd6e0","#fff6e0"];
  return colors[Math.floor(Math.random()*colors.length)];
}
function createHeartBG() {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: 10 + Math.random() * 24,
    speed: 0.12 + Math.random() * 0.22,
    alpha: 0.18 + Math.random() * 0.12,
    color: randomColor(),
    dx: (Math.random() - 0.5) * 0.25
  };
}
heartsBG = Array.from({length: 28}, createHeartBG);
function drawHeartBG(h) {
  ctx.save();
  ctx.globalAlpha = h.alpha;
  ctx.beginPath();
  ctx.moveTo(h.x, h.y + h.size/4);
  ctx.bezierCurveTo(h.x, h.y, h.x-h.size/2, h.y, h.x-h.size/2, h.y + h.size/4);
  ctx.bezierCurveTo(h.x-h.size/2, h.y + h.size/2, h.x, h.y + h.size/1.3, h.x, h.y + h.size);
  ctx.bezierCurveTo(h.x, h.y + h.size/1.3, h.x+h.size/2, h.y + h.size/2, h.x+h.size/2, h.y + h.size/4);
  ctx.bezierCurveTo(h.x+h.size/2, h.y, h.x, h.y, h.x, h.y + h.size/4);
  ctx.closePath();
  ctx.fillStyle = h.color;
  ctx.shadowColor = "#fff6";
  ctx.shadowBlur = 8;
  ctx.fill();
  ctx.restore();
}
function animateBG() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  for (let h of heartsBG) {
    drawHeartBG(h);
    h.y -= h.speed;
    h.x += h.dx;
    if (h.y + h.size < 0 || h.x < -40 || h.x > canvas.width+40) {
      Object.assign(h, createHeartBG(), {y: canvas.height+Math.random()*40});
    }
  }
  requestAnimationFrame(animateBG);
}
animateBG();

// Animación de corazones flotando y explotan al tocar
const heartsContainer = document.querySelector('.hearts');
function crearCorazon() {
  const heart = document.createElement('div');
  heart.className = 'heart';
  heart.style.left = Math.random() * 100 + 'vw';
  heart.style.animationDuration = (3.5 + Math.random() * 2.7) + 's';
  heart.innerHTML = `<svg viewBox="0 0 32 29.6"><path fill="#ff3e6c" d="M23.6,0c-2.6,0-5,1.3-6.6,3.3C15.4,1.3,13,0,10.4,0C4.7,0,0,4.7,0,10.4c0,8.1,13.8,17.7,15,18.5
    c0.4,0.3,0.9,0.3,1.3,0c1.2-0.8,15-10.4,15-18.5C32,4.7,27.3,0,23.6,0z"/></svg>`;
  heart.style.top = (65 + Math.random() * 30) + 'vh';
  heart.addEventListener('click', (e) => {
    heart.classList.add('explode');
    setTimeout(() => heart.remove(), 700);
  });
  heartsContainer.appendChild(heart);
  setTimeout(() => heart.remove(), 5800);
}
setInterval(crearCorazon, 610);

// Botón de carta oculta
const revealBtn = document.getElementById('revealBtn');
const carta = document.getElementById('carta');
let cartaMostrada = false;
revealBtn.addEventListener('click', () => {
  cartaMostrada = !cartaMostrada;
  carta.style.display = cartaMostrada ? 'block' : 'none';
  revealBtn.innerHTML = cartaMostrada 
    ? '<span class="carta-heart"></span> Ocultar carta'
    : '<span class="carta-heart"></span> Carta para ti';
});

// Carrusel de fotos profesional + táctil
const carrusel = document.getElementById('carrusel');
const imgs = carrusel.getElementsByTagName('img');
let carruselIndex = 0;
function mostrarCarrusel(idx) {
  for(let i=0; i<imgs.length; i++) {
    imgs[i].classList.remove('active');
    imgs[i].style.opacity = 0;
  }
  imgs[idx].classList.add('active');
  imgs[idx].style.opacity = 1;
}
mostrarCarrusel(0);
document.getElementById('prev').onclick = () => {
  carruselIndex = (carruselIndex - 1 + imgs.length) % imgs.length;
  mostrarCarrusel(carruselIndex);
};
document.getElementById('next').onclick = () => {
  carruselIndex = (carruselIndex + 1) % imgs.length;
  mostrarCarrusel(carruselIndex);
};
// Carrusel táctil para móvil
let startX = 0, deltaX = 0;
carrusel.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
}, {passive:true});
carrusel.addEventListener('touchmove', (e) => {
  deltaX = e.touches[0].clientX - startX;
}, {passive:true});
carrusel.addEventListener('touchend', (e) => {
  if (deltaX > 40) { // Desliza derecha
    carruselIndex = (carruselIndex - 1 + imgs.length) % imgs.length;
    mostrarCarrusel(carruselIndex);
  } else if (deltaX < -40) { // Desliza izquierda
    carruselIndex = (carruselIndex + 1) % imgs.length;
    mostrarCarrusel(carruselIndex);
  }
  startX = 0;
  deltaX = 0;
});

// Música romántica con animación
const musicBtn = document.getElementById('musicBtn');
const music = document.getElementById('music');
let musicando = false;
musicBtn.addEventListener('click', () => {
  if (!musicando) {
    music.play();
    musicando = true;
    musicBtn.innerHTML = '<span class="music-heart">💗</span> Pausar música';
  } else {
    music.pause();
    musicando = false;
    musicBtn.innerHTML = '<span class="music-heart">💗</span> Música para nuestro amor';
  }
});
music.addEventListener('ended', () => {
  musicando = false;
  musicBtn.innerHTML = '<span class="music-heart">💗</span> Música para nuestro amor';
});