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
  if (e.key === 'Escape') {
    closeMobileNav();
    closeModal();
  }
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
let closeModalTimer = null; // To hold the timeout for closing the modal

function openModal(projectKey) {
  const project = projectsInfo[projectKey];
  if (!project) return;

  if (closeModalTimer) {
    clearTimeout(closeModalTimer);
  }

  if (modalEl) {
    modalEl.remove();
  }

  modalBg.classList.add('open');
  document.body.style.overflow = "hidden";

  modalEl = document.createElement("div");
  modalEl.className = "project-modal";

  let imageBlock = `<img src="${project.img}" alt="${project.title}">`;
  if (project.img2) {
    imageBlock += `<img src="${project.img2}" alt="${project.title} additional view">`;
  }

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

  modalBg.appendChild(modalEl);

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
    document.body.style.overflow = "";

    const modalToRemove = modalEl;
    
    closeModalTimer = setTimeout(() => {
      modalToRemove.remove();
      if (modalEl === modalToRemove) {
        modalEl = null;
      }
    }, 400); 
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

/* --- LAVA LAMP BACKGROUND ANIMATION --- */
window.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('lava-lamp-bg');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width, height;
    const isTouchDevice = 'ontouchstart' in window;

    const mouse = {
        x: null,
        y: null,
        vx: 0,
        vy: 0,
        lastX: null,
        lastY: null,
        timer: null
    };

    // Gyroscope data
    const gyro = {
        x: 0,
        y: 0
    };

    const config = {
        colors: ['#4338CA', '#6D28D9', '#4338CA'],
        ballCount: 15,
        mouseForce: isTouchDevice ? 0 : 400,
        speed: 0.1, 
        blur: 40,
        contrast: 30,
        gyroForce: 0.1 // Adjust this value to change gyroscope sensitivity
    };

    class Ball {
        constructor(layer) {
            this.layer = layer;
            this.respawn();
            this.vy = (Math.random() - 0.5) * config.speed * this.scale;
            this.vx = (Math.random() - 0.5) * config.speed * this.scale;
        }

        respawn() {
            this.scale = 0.2 + (this.layer / 3) * 0.8;
            if (window.innerWidth <= 750) { // Check for mobile screen width
                this.r = (50 + Math.random() * 50) * this.scale; // Smaller bulbs for mobile
            } else {
                this.r = (100 + Math.random() * 100) * this.scale; // Original size for desktop
            }
            this.x = Math.random() * (width - 2 * this.r) + this.r;
            this.y = Math.random() * (height - 2 * this.r) + this.r;
            this.color = config.colors[Math.floor(Math.random() * config.colors.length)];
        }

        update() {
            // Add inherent slow motion (buoyancy and drift)
            this.vy -= 0.005 * this.scale * config.speed;
            this.vx += (Math.random() - 0.5) * 0.01 * config.speed;

            // Gyroscope interaction
            if (isTouchDevice) {
                this.vx += gyro.x * config.gyroForce * this.scale;
                this.vy += gyro.y * config.gyroForce * this.scale;
            }

            // Mouse interaction
            if (config.mouseForce > 0 && mouse.x !== null) {
                const dx = this.x - mouse.x;
                const dy = this.y - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const interactionRadius = 150 * this.scale;
                
                if (dist < interactionRadius) {
                    const angle = Math.atan2(dy, dx);
                    const force = (interactionRadius - dist) / interactionRadius;
                    
                    this.vx += (Math.cos(angle) * force + mouse.vx) * 0.1 * this.scale;
                    this.vy += (Math.sin(angle) * force + mouse.vy) * 0.1 * this.scale;
                }
            }
            
            this.x += this.vx;
            this.y += this.vy;

            // Boundary checks
            if (this.x < this.r) { this.x = this.r; this.vx *= -0.9; }
            if (this.x > width - this.r) { this.x = width - this.r; this.vx *= -0.9; }
            if (this.y < this.r) { this.y = this.r; this.vy *= -0.9; }
            if (this.y > height - this.r) { this.y = height - this.r; this.vy *= -0.9; }

            this.vx *= 0.995;
            this.vy *= 0.995;
        }

        draw() {
            ctx.beginPath();
            const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.r);
            gradient.addColorStop(0, this.color + 'ff');
            gradient.addColorStop(0.8, this.color + 'b0');
            gradient.addColorStop(1, this.color + '00');

            ctx.fillStyle = gradient;
            ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    const layers = [
        { count: Math.floor(config.ballCount * 0.25), balls: [] },
        { count: Math.floor(config.ballCount * 0.35), balls: [] },
        { count: Math.floor(config.ballCount * 0.40), balls: [] },
    ];

    function setup() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        layers.forEach((layer, i) => {
            layer.balls = [];
            for (let j = 0; j < layer.count; j++) {
                layer.balls.push(new Ball(i + 1));
            }
        });
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        ctx.filter = `blur(${config.blur}px) contrast(${config.contrast})`;
        
        layers.forEach(layer => {
            layer.balls.forEach(ball => {
                ball.update();
                ball.draw();
            });
        });
        
        ctx.filter = 'none';

        requestAnimationFrame(animate);
    }
    
    window.addEventListener('resize', setup);

    if (!isTouchDevice) {
        window.addEventListener('mousemove', e => {
            if (mouse.timer) {
                clearTimeout(mouse.timer);
            }

            if (mouse.lastX !== null) {
                mouse.vx = (e.clientX - mouse.lastX) * 0.5;
                mouse.vy = (e.clientY - mouse.lastY) * 0.5;
            }
            mouse.x = e.clientX;
            mouse.y = e.clientY;
            mouse.lastX = e.clientX;
            mouse.lastY = e.clientY;

            mouse.timer = setTimeout(() => {
                mouse.vx = 0;
                mouse.vy = 0;
            }, 100);
        });
        window.addEventListener('mouseleave', () => {
            mouse.x = null;
            mouse.y = null;
            mouse.vx = 0;
            mouse.vy = 0;
        });
    }

    // --- GYROSCOPE CODE ---
    const gyroButton = document.getElementById('gyro-button');
    if (gyroButton) {
        gyroButton.addEventListener('click', () => {
            if (typeof DeviceOrientationEvent.requestPermission === 'function') {
                // iOS 13+
                DeviceOrientationEvent.requestPermission()
                    .then(permissionState => {
                        if (permissionState === 'granted') {
                            window.addEventListener('deviceorientation', handleOrientation);
                            gyroButton.style.display = 'none'; // Hide button after permission is granted
                        }
                    })
                    .catch(console.error);
            } else {
                // Non-iOS 13+ devices
                window.addEventListener('deviceorientation', handleOrientation);
                gyroButton.style.display = 'none';
            }
        });
    }

    function handleOrientation(event) {
        // Gyroscope data:
        // event.beta is the front-to-back tilt (y-axis)
        // event.gamma is the side-to-side tilt (x-axis)
        // We'll normalize the values a bit.
        gyro.y = event.beta / 90; 
        gyro.x = event.gamma / 90;
    }
    // --- END GYROSCOPE CODE ---

    setup();
    animate();
});