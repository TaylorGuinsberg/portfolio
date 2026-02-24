// Carrega dados do projeto pela URL ?id=
const params = new URLSearchParams(window.location.search);
const projectId = parseInt(params.get("id"));

fetch("projects.json")
  .then(res => res.json())
  .then(data => {
    const project = data.find(p => p.id === projectId);
    if (!project) return;
    document.title = project.title;
    document.getElementById("project-title").textContent = project.title;
    document.getElementById("project-description").textContent = project.description;
  });

// Lógica do carrossel
const carouselState = {};

function slide(id, direction) {
  const carousel = document.getElementById(id);
  const track = carousel.querySelector(".carousel-track");
  const slides = track.querySelectorAll("img");
  const total = slides.length;

  if (!carouselState[id]) carouselState[id] = 0;

  carouselState[id] = (carouselState[id] + direction + total) % total;
  const current = carouselState[id];

  track.style.transform = `translateX(-${current * 100}%)`;

  document.getElementById(`counter-${id}`).textContent =
    String(current + 1).padStart(2, '0') + '/' + String(total).padStart(2, '0');

  const dots = document.querySelectorAll(`#dots-${id} .dot`);
  dots.forEach((d, i) => d.classList.toggle("active", i === current));
}

// ── LIGHTBOX ──
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

let currentImages = [];
let currentIndex = 0;

function openLightbox(imgs, index) {
  currentImages = imgs;
  currentIndex = index;
  lightboxImg.src = currentImages[currentIndex].src;
  lightbox.classList.add("active");
}

document.addEventListener("click", (e) => {
  const img = e.target.closest(".carousel-track img");
  if (!img) return;

  const track = img.closest(".carousel-track");
  const imgs = Array.from(track.querySelectorAll("img"));
  const index = imgs.indexOf(img);
  openLightbox(imgs, index);
});

document.getElementById("lightbox-prev").addEventListener("click", (e) => {
  e.stopPropagation();
  currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
  lightboxImg.src = currentImages[currentIndex].src;
});

document.getElementById("lightbox-next").addEventListener("click", (e) => {
  e.stopPropagation();
  currentIndex = (currentIndex + 1) % currentImages.length;
  lightboxImg.src = currentImages[currentIndex].src;
});

document.getElementById("lightbox-close").addEventListener("click", () => {
  lightbox.classList.remove("active");
});

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) lightbox.classList.remove("active");
});

document.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("active")) return;
  if (e.key === "Escape") lightbox.classList.remove("active");
  if (e.key === "ArrowLeft") document.getElementById("lightbox-prev").click();
  if (e.key === "ArrowRight") document.getElementById("lightbox-next").click();
});

