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
    setTimeout(typeWriter, 40); // typing speed
  } else {
    // Move to next line if available
    if (twLine < typewriterText.length - 1) {
      typewriterEl.innerHTML += "<br>";
      twLine++;
      twChar = 0;
      setTimeout(typeWriter, 430); // pause before next line
    }
  }
}
window.addEventListener('DOMContentLoaded', typeWriter);

/* Project Modal Functionality */
const projectsInfo = {
  proj1: {
    title: "Tone Control/Karaoke Mixer Circuit",
    desc: "A five-stage audio processing system, featuring mixer/karaoke switching, tone control, and LED display. Designed and simulated using Multisim and MATLAB.",
    img: "assets/project1-img.jpg",
    pdf: "assets/project1-report.pdf"
  },
  proj2: {
    title: "ASME - Assistive Tech",
    desc: "A multi-sensor vibration feedback wearable for visually impaired navigation. Features real-time proximity detection using Arduino and ultrasonic sensors.",
    img: "assets/project2-img.jpg",
    
  },
  proj3: {
    title: "Kibble Dispenser for Service Dogs",
    desc: "A wheelchair-attachable dog food dispenser delivering single kibbles, optimized for low-dexterity users. Designed in Fusion 360, prototyped via 3D printing.",
    img: "assets/project3-img.jpg",
    pdf: "assets/project3-proposal.pdf"
  },
  proj4: {
    title: "MM-LPBF AM Research",
    desc: "Finite element analysis and mesh convergence studies on brass-steel alloys for additive manufacturing. Improved simulation speeds, lower error, and higher reliability.",
    img: "assets/research_img_1.jpeg",
    
  }
};

const modalBg = document.getElementById('modal-bg');
let modalEl = null;

function openModal(projectKey) {
  closeModal();
  modalBg.style.display = "block";
  modalEl = document.createElement("div");
  modalEl.className = "project-modal";
  modalEl.innerHTML = `
    <button class="modal-close" title="Close">&times;</button>
    <h3>${projectsInfo[projectKey].title}</h3>
    <div class="modal-content">${projectsInfo[projectKey].desc}</div>
    <img src="${projectsInfo[projectKey].img}" alt="Project image" class="modal-img">
    <a href="${projectsInfo[projectKey].pdf}" class="modal-pdf" target="_blank">View Associated Documents</a>
  `;
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
