
fetch("projects.json")
  .then(response => response.json())
  .then(data => {
    const container = document.querySelector(".projects-container");

    data.forEach((project, index) => {
      const card = document.createElement("div");
      card.classList.add("project-item");
      if (index % 2 !== 0) card.classList.add("reverse");

      card.innerHTML = `
        <img src="${project.image}" alt="${project.title}">
        <div class="project-text">
          <h2>${project.title}</h2>
          <p>${project.description}</p>
          <a href="projetos.html?id=${project.id}">Ver Projeto</a>
        </div>
      `;

      container.appendChild(card);
    });
  });



document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute("href"));
    if (!target) return;

    const start = window.pageYOffset;
    const end = target.offsetTop;
    const distance = end - start;
    const duration = 500; // tempo da animação (1.4 segundos)
    let startTime = null;

    function animation(currentTime) {
      if (!startTime) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);

      window.scrollTo(0, start + distance * easeInOut(progress));

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    }

    function easeInOut(t) {
      return t < 0.5
        ? 2 * t * t
        : 1 - Math.pow(-2 * t + 2, 2) / 2;
    }

    requestAnimationFrame(animation);
  });
});
