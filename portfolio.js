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

/* --- Hamburger nav functionality --- */
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobile-nav');

function openMobileNav() {
  hamburger.classList.add('open');
  hamburger.setAttribute('aria-expanded', 'true');
  mobileNav.classList.add('open');
  mobileNav.setAttribute('aria-hidden', 'false');
}

function closeMobileNav() {
  hamburger.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
  mobileNav.classList.remove('open');
  mobileNav.setAttribute('aria-hidden', 'true');
}

if (hamburger) {
  hamburger.addEventListener('click', (e) => {
    const isOpen = hamburger.classList.contains('open');
    if (isOpen) closeMobileNav();
    else openMobileNav();
  });
}

// Close when clicking outside
document.addEventListener('click', (e) => {
  const target = e.target;
  const wrap = document.querySelector('.hamburger-wrap');
  if (!wrap) return;
  if (!wrap.contains(target)) {
    closeMobileNav();
  }
});

// Close on Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeMobileNav();
});

// Smooth scrolling for nav links
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', (e) => {
    closeMobileNav();
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 72; // account for navbar height
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }
  });
});

/* Project Modal Functionality */
const projectsInfo = {
  // Personal Projects
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
  },
  // Internship Projects
  intern1: {
    title: "Screw Torque Testing - Cisco micro-LinkOVER",
    desc: "Tested screws under different torque levels and lengths for failure behavior. Analyzed results and presented findings in a clear PowerPoint summary.",
    achievement: "Key Takeaway: Hands-on experience with failure testing and data interpretation.",
    img: "assets/Screw PIC 1.png",
    img2: "assets/Screw PIC 2.png",
    link: null
  },
  intern2: {
    title: "PowerApp Interface for Failure Submissions",
    desc: "Built a user-friendly PowerApp linked to SharePoint for failure tracking. Enabled direct customer input for failed product details.",
    achievement: "Key Takeaway: Improved understanding of customer-facing tools in engineering.",
    img: "assets/Power PIC 1.png",
    img2: "assets/Power PIC 2.png",
    link: null
  },
  intern3: {
    title: "Qualification Reports & LLCR Data Processing",
    desc: "Transferred LLCR data from Excel to Minitab for statistical analysis (probability plots, descriptive stats). Edited and prepared Qualification Test Reports in Overleaf using LaTeX templates. Sourced technical info (test methods, QTR numbers, requirements) to ensure accuracy.",
    achievement: "Key Takeaway: Proficiency in Minitab and Overleaf.",
    img: "assets/Qualification PIC 1.png",
    link: null
  },
  intern4: {
    title: "Fixture Design for Vibration Testing",
    desc: "Helped design fixtures for PCB vibration testing. Reviewed 2D PCB traces, and designed fixture to accommodate them.",
    achievement: "Key Takeaway: Exposure to mechanical design DFAM techniques.",
    img: "assets/Fixture PIC 2.png",
    link: null
  }
};


const modalBg = document.getElementById('modal-bg');
let modalEl = null;

function openModal(projectKey) {
  const project = projectsInfo[projectKey];
  if (!project) return;

  closeModal(); // Close any existing modal first
  
  modalBg.classList.add('open');

  modalEl = document.createElement("div");
  modalEl.className = "project-modal";

  // Build the image block. It can contain one or two images.
  let imageBlock = `<img src="${project.img}" alt="${project.title}">`;
  if (project.img2) {
    imageBlock += `<img src="${project.img2}" alt="${project.title} additional view">`;
  }

  // Special case for project 5 (title + image only)
  if (projectKey === "proj5") {
    modalEl.innerHTML = `
      <button class="modal-close" title="Close">&times;</button>
      <h3>${project.title}</h3>
      <div class="modal-right" style="grid-column: span 2; justify-content:center;">
        ${imageBlock}
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
        ${imageBlock}
      </div>
    `;
  }

  modalBg.appendChild(modalEl); // Append modal to background for animation
  document.body.style.overflow = "hidden";

  modalEl.querySelector('.modal-close').onclick = closeModal;
  modalBg.onclick = function(e) {
      if (e.target === modalBg) {
          closeModal();
      }
  };
}

function closeModal() {
  if (modalEl) {
    modalBg.classList.remove('open');
    // Wait for the animation to finish before removing the element
    setTimeout(() => {
        if (modalEl) { // Check if it still exists
            modalBg.innerHTML = ''; // Clear the modal content
            modalEl = null;
            document.body.style.overflow = "";
        }
    }, 400); // Match CSS transition time
  }
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