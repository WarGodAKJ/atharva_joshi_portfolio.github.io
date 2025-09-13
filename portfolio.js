/* Typing animation on intro */
const typewriterText = [
  "Hi I'm Atharva!",
  "Nice to meet you!"
];

const typewriterEl = document.getElementById('typewriter');
let twLine = 0, twChar = 0;

function typeWriter() {
  if (!typewriterEl) return;
  let currentLine = typewriterText[twLine];
  if (twChar < currentLine.length) {
    typewriterEl.innerHTML += currentLine.charAt(twChar);
    twChar++;
    setTimeout(typeWriter, 80); // slower typing
  } else {
    if (twLine < typewriterText.length - 1) {
      typewriterEl.innerHTML += "<br>";
      twLine++;
      twChar = 0;
      setTimeout(typeWriter, 600); // pause before next line
    }
  }
}
window.addEventListener('DOMContentLoaded', typeWriter);

/* Project Modal Functionality */
const projectsInfo = {
  proj1: {
    title: "Tone Control/Karaoke Mixer Circuit",
    desc: "A five-stage audio processing system, featuring mixer/karaoke switching, tone control, and LED display. Designed and simulated using Multisim and MATLAB.",
    achievement: "Achievement: Clear audio with effective tone control.",
    img: "assets/project1-img.jpg",
    link: { type: "pdf", url: "assets/project1-report.pdf", label: "View Associated Documents" }
  },
  proj2: {
    title: "Multi-Sensor Haptic Headset – ASME",
    desc: "A multi-sensor vibration feedback wearable for visually impaired navigation. Features real-time proximity detection using Arduino and ultrasonic sensors.",
    achievement: "Achievement: Tactile feedback device improving user experience.",
    img: "assets/project2-img.jpg",
    link: { type: "github", url: "https://github.com/UnbrokenMango21/AssistiveTechHeadset", label: "GitHub" }
  },
  proj3: {
    title: "Kibble Dispenser for Service Dogs",
    desc: "A wheelchair-attachable dog food dispenser delivering single kibbles, optimized for low-dexterity users. Designed in Fusion 360, prototyped via 3D printing.",
    achievement: "Achievement: 90% success rate operated by target users.",
    img: "assets/project3-img.jpg",
    link: { type: "pdf", url: "assets/project3-proposal.pdf", label: "View Associated Documents" }
  },
  proj4: {
    title: "Additive Manufacturing Research",
    desc: "Finite element analysis and mesh convergence studies on brass-steel alloys for additive manufacturing. Improved simulation speeds, lower error, and higher reliability.",
    achievement: "Achievement: Successfully reduced mesh element count by 40% while improving simulation reliability by 30%.",
    img: "assets/research_img_1.jpeg",
    link: null
  },
  proj5: {
    title: "Coming Soon!",
    desc: "",
    achievement: "",
    img: "assets/project5-img.jpg",
    link: null
  }
};

const modalBg = document.getElementById('modal-bg');
let modalEl = null;

function openModal(projectKey) {
  const project = projectsInfo[projectKey];
  if (!project) return;

  closeModal();
  modalBg.style.display = "block";

  modalEl = document.createElement("div");
  modalEl.className = "project-modal";

  // Special case for project 5 (title + image only)
  if (projectKey === "proj5") {
    modalEl.innerHTML = `
      <button class="modal-close" title="Close">&times;</button>
      <h3>${project.title}</h3>
      <div class="modal-right" style="grid-column: span 2; justify-content:center;">
        <img src="${project.img}" alt="${project.title}">
      </div>
    `;
  } else {
    modalEl.innerHTML = `
      <button class="modal-close" title="Close">&times;</button>
      <h3>${project.title}</h3>
      <div class="modal-left">
        ${project.desc ? `<div class="modal-content">${project.desc}</div>` : ""}
        ${project.achievement ? `<div class="achievement">${project.achievement}</div>` : ""}
        ${project.link ? `<a href="${project.link.url}" target="_blank" class="modal-link">${project.link.label}</a>` : ""}
      </div>
      <div class="modal-right">
        <img src="${project.img}" alt="${project.title}">
      </div>
    `;
  }

  document.body.appendChild(modalEl);
  document.body.style.overflow = "hidden";

  modalEl.querySelector('.modal-close').onclick = closeModal;
  modalBg.onclick = closeModal;
}

function closeModal() {
  if (modalEl) {
    modalEl.remove();
    modalEl = null;
    document.body.style.overflow = "";
  }
  modalBg.style.display = "none";
}

document.querySelectorAll('.project-card').forEach(card =>
  card.onclick = function() {
    openModal(card.getAttribute('data-project'));
  }
);

/* Collapsible Experience Cards */
document.querySelectorAll('.exp-header').forEach(header => {
  header.onclick = function() {
    const parent = header.parentElement;
    parent.classList.toggle('open');
  }
});
