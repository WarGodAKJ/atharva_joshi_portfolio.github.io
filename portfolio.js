// ... Typing animation code remains unchanged ...

const projectsInfo = {
  proj1: {
    title: "Tone Control/Karaoke Mixer Circuit",
    desc: "A five-stage audio processing system with mixer/karaoke switching, tone control, and LED volume display. Designed and simulated using Multisim and MATLAB.",
    skill: "Circuit Design, NI Multisim, MATLAB",
    ach: "Clear audio with effective tone control.",
    img1: "assets/project1-img.jpg",
    img2: null,
    pdf: "assets/project1-report.pdf"
  },
  proj2: {
    title: "ASME - Assistive Tech",
    desc: "Multi-sensor vibration feedback wearable for visually impaired navigation. Real-time proximity detection using Arduino and ultrasonic sensors.",
    skill: "Team Leadership, Sensor Integration, SolidWorks",
    ach: "Tactile feedback device improving user experience.",
    img1: "assets/project2-img.jpg",
    img2: null,
    pdf: null,
    github: "https://github.com/WarGodAKJ/AssistiveTechProject"
  },
  proj3: {
    title: "Kibble Dispenser for Service Dogs",
    desc: "Wheelchair-attachable dog food dispenser optimized for low-dexterity users, delivers individual kibbles, designed in Fusion 360 and 3D printed.",
    skill: "CAD (Fusion 360), 3D Printing, Prototyping",
    ach: "90% success rate, successfully operated by target users.",
    img1: "assets/project3-img.jpg",
    img2: null,
    pdf: "assets/project3-proposal.pdf"
  },
  proj4: {
    title: "Additive Manufacturing Research",
    desc: "Finite element analysis and mesh convergence studies for brass-steel alloys in AM processes. Improved simulation speeds, lower error, higher reliability.",
    skill: "FEA (Ansys, Abaqus), Strength of Materials",
    ach: "Reduced mesh element count by 40%, enhanced simulation reliability by 30%.",
    img1: "assets/research_img_1.jpg",
    img2: "assets/research_img_2.jpg",
    pdf: null
  }
};

const modalBg = document.getElementById('modal-bg');
let modalEl = null;

function openModal(projectKey) {
  closeModal();
  modalBg.style.display = "block";
  const info = projectsInfo[projectKey];
  modalEl = document.createElement("div");
  modalEl.className = "project-modal";
  modalEl.innerHTML = `
    <div class="modal-images">
      <img src="${info.img1}" class="modal-img" alt="Main project image">
      ${info.img2 ? `<img src="${info.img2}" class="modal-img" alt="Secondary project image">` : ''}
    </div>
    <div class="modal-content-section">
      <h3>${info.title}</h3>
      <div class="modal-desc">${info.desc}</div>
      <div class="modal-skill">Skills: ${info.skill}</div>
      <div class="modal-ach">Achievement: ${info.ach}</div>
      ${info.pdf ? `<a href="${info.pdf}" class="modal-pdf" target="_blank">Download/View PDF</a>` : ""}
      ${info.github ? `<a href="${info.github}" class="modal-github" target="_blank">GitHub Repository</a>` : ""}
    </div>
    <button class="modal-close" title="Close">&times;</button>
  `;
  document.body.appendChild(modalEl);
  document.body.style.overflow = "hidden";
  modalEl.querySelector('.modal-close').onclick = closeModal;
  modalBg.onclick = closeModal;
}

function closeModal() {
  if (modalEl) { modalEl.remove(); modalEl = null; document.body.style.overflow = ""; }
  modalBg.style.display = "none";
}

document.querySelectorAll('.project-card').forEach(card =>
  card.onclick = function() { openModal(card.getAttribute('data-project')); }
);

// Collapsible experiences unchanged
document.querySelectorAll('.exp-header').forEach(header => {
  header.onclick = function() { header.parentElement.classList.toggle('open'); }
});
