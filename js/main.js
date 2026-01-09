// ====================================
// SHAIMAA ELSHAYEB - Portfolio Script
// Modern Interactive Features
// ====================================

// ====================================
// MOBILE NAVIGATION TOGGLE
// ====================================
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-menu a");

if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");

    // Animate toggle icon
    const spans = navToggle.querySelectorAll("span");
    if (navMenu.classList.contains("active")) {
      spans[0].style.transform = "rotate(45deg) translateY(10px)";
      spans[1].style.opacity = "0";
      spans[2].style.transform = "rotate(-45deg) translateY(-10px)";
    } else {
      spans[0].style.transform = "none";
      spans[1].style.opacity = "1";
      spans[2].style.transform = "none";
    }
  });

  // Close menu when clicking on a link
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
      const spans = navToggle.querySelectorAll("span");
      spans[0].style.transform = "none";
      spans[1].style.opacity = "1";
      spans[2].style.transform = "none";
    });
  });
}

// ====================================
// NAVBAR SCROLL EFFECT
// ====================================
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// ====================================
// SCROLL ANIMATIONS
// ====================================
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

// Observe all sections
document.querySelectorAll("section").forEach((section) => {
  sectionObserver.observe(section);
});

// ====================================
// SMOOTH SCROLL FUNCTION
// ====================================
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    const navHeight = navbar.offsetHeight;
    const sectionTop = section.offsetTop - navHeight;

    window.scrollTo({
      top: sectionTop,
      behavior: "smooth",
    });
  }
}

// Handle all anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href").substring(1);
    if (targetId) {
      scrollToSection(targetId);
    }
  });
});

// ====================================
// MUSIC PLAYER
// ====================================
let currentTrack = null;
let progressInterval = null;

function togglePlay(trackIndex) {
  const tracks = document.querySelectorAll(".track");
  const clickedTrack = tracks[trackIndex];
  const playBtn = clickedTrack.querySelector(".play-btn i");
  const progressBar = clickedTrack.querySelector(".progress-bar");
  const progress = clickedTrack.querySelector(".progress");

  // Stop other tracks
  if (currentTrack !== null && currentTrack !== trackIndex) {
    stopTrack(currentTrack);
  }

  // Toggle current track
  if (playBtn.classList.contains("fa-play")) {
    startTrack(trackIndex, clickedTrack, playBtn, progressBar, progress);
  } else {
    stopTrack(trackIndex);
  }
}

function startTrack(trackIndex, trackElement, playBtn, progressBar, progress) {
  playBtn.classList.replace("fa-play", "fa-pause");
  trackElement.classList.add("active");
  progressBar.classList.add("active");

  let width = 0;
  progressInterval = setInterval(() => {
    if (width >= 100) {
      clearInterval(progressInterval);
      playBtn.classList.replace("fa-pause", "fa-play");
      trackElement.classList.remove("active");
      progress.style.width = "0%";
      setTimeout(() => {
        progressBar.classList.remove("active");
      }, 300);
      currentTrack = null;
    } else {
      width += 0.5;
      progress.style.width = width + "%";
    }
  }, 50);

  currentTrack = trackIndex;
}

function stopTrack(trackIndex) {
  const tracks = document.querySelectorAll(".track");
  const track = tracks[trackIndex];
  const playBtn = track.querySelector(".play-btn i");
  const progressBar = track.querySelector(".progress-bar");
  const progress = track.querySelector(".progress");

  playBtn.classList.replace("fa-pause", "fa-play");
  track.classList.remove("active");
  clearInterval(progressInterval);
  progress.style.width = "0%";

  setTimeout(() => {
    progressBar.classList.remove("active");
  }, 300);

  currentTrack = null;
}

// ====================================
// VIDEO CARDS INTERACTION
// ====================================
document.querySelectorAll(".video-card").forEach((card, index) => {
  card.addEventListener("click", () => {
    console.log(`فيديو ${index + 1} تم الضغط عليه`);
    // يمكن إضافة رابط الفيديو هنا
    alert("سيتم فتح الفيديو قريباً! أضف رابط الفيديو من يوتيوب");
  });
});

// ====================================
// PLATFORM BUTTONS
// ====================================
document.querySelectorAll(".platform-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const platform = btn.querySelector("span").textContent;
    console.log(`تم الضغط على منصة: ${platform}`);
    // أضف الروابط الحقيقية للمنصات هنا
    alert(`سيتم توجيهك إلى ${platform}`);
  });
});

// ====================================
// SOCIAL CARDS
// ====================================
document.querySelectorAll(".social-card").forEach((card) => {
  card.addEventListener("click", (e) => {
    e.preventDefault();
    const platform = card.querySelector("h3").textContent;
    console.log(`تم الضغط على: ${platform}`);
    // أضف الروابط الحقيقية للسوشيال ميديا هنا
    alert(`سيتم توجيهك إلى ${platform}`);
  });
});

// ====================================
// BOOKING BUTTON
// ====================================
const bookingBtn = document.querySelector(".btn-booking");
if (bookingBtn) {
  bookingBtn.addEventListener("click", () => {
    console.log("تم الضغط على زر الحجز");
    // يمكن استبدال هذا برابط البريد الإلكتروني أو نموذج الحجز
    window.location.href =
      "mailto:booking@shaimaaelshayeb.com?subject=حجز حفلة&body=أود الاستفسار عن حجز حفلة";
  });
}

// ====================================
// KEYBOARD CONTROLS
// ====================================
document.addEventListener("keydown", (e) => {
  // مسافة للتشغيل/الإيقاف
  if (e.code === "Space" && currentTrack !== null) {
    e.preventDefault();
    togglePlay(currentTrack);
  }

  // سهم يمين للأغنية التالية
  if (e.code === "ArrowRight" && currentTrack !== null) {
    e.preventDefault();
    const nextTrack = (currentTrack + 1) % 3;
    togglePlay(nextTrack);
  }

  // سهم يسار للأغنية السابقة
  if (e.code === "ArrowLeft" && currentTrack !== null) {
    e.preventDefault();
    const prevTrack = (currentTrack - 1 + 3) % 3;
    togglePlay(prevTrack);
  }
});

// ====================================
// ACTIVE NAV LINK ON SCROLL
// ====================================
const sections = document.querySelectorAll("section[id]");

function highlightNavLink() {
  const scrollY = window.pageYOffset;

  sections.forEach((section) => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document.querySelectorAll(".nav-menu a").forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active");
        }
      });
    }
  });
}

window.addEventListener("scroll", highlightNavLink);

// ====================================
// TESTIMONIALS ANIMATION
// ====================================
const testimonials = document.querySelectorAll(".testimonial-card");
testimonials.forEach((card, index) => {
  card.style.animationDelay = `${index * 0.2}s`;
});

// ====================================
// PARALLAX EFFECT FOR HERO
// ====================================
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const heroContent = document.querySelector(".hero-content");
  const heroBgIcon = document.querySelector(".hero-bg-icon");

  if (heroContent) {
    heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
    heroContent.style.opacity = 1 - scrolled / 700;
  }

  if (heroBgIcon) {
    heroBgIcon.style.transform = `translateY(${scrolled * 0.3}px) rotate(${
      scrolled * 0.1
    }deg)`;
  }
});

// ====================================
// STATS COUNTER ANIMATION
// ====================================
function animateCounter(element, target, suffix = "") {
  let current = 0;
  const increment = target / 100;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target + suffix;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current) + suffix;
    }
  }, 20);
}

const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const statNumbers = entry.target.querySelectorAll(".stat-number");
        statNumbers.forEach((stat) => {
          const text = stat.textContent;
          if (text.includes("M")) {
            const value = parseFloat(text);
            animateCounter(stat, value, "M+");
          } else if (text.includes("K")) {
            const value = parseFloat(text);
            animateCounter(stat, value, "K+");
          }
        });
        statsObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

const heroStats = document.querySelector(".hero-stats");
if (heroStats) {
  statsObserver.observe(heroStats);
}

// ====================================
// PAGE LOAD ANIMATION
// ====================================
window.addEventListener("load", () => {
  document.body.style.opacity = "0";
  document.body.style.transition = "opacity 0.5s ease";

  setTimeout(() => {
    document.body.style.opacity = "1";
  }, 100);
});

// ====================================
// COPY EMAIL ON CLICK (Optional)
// ====================================
const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
emailLinks.forEach((link) => {
  link.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    const email = link.href.replace("mailto:", "").split("?")[0];
    navigator.clipboard.writeText(email).then(() => {
      alert("تم نسخ البريد الإلكتروني: " + email);
    });
  });
});

// ====================================
// CONSOLE MESSAGE
// ====================================
console.log(
  "%c🎤 شيماء الشايب",
  "font-size: 24px; color: #c9963d; font-weight: bold;"
);
console.log("%cمطربة مصرية", "font-size: 16px; color: #f5f5f5;");
console.log(
  "%cWebsite by Professional Team",
  "font-size: 12px; color: #a0a0a0; font-style: italic;"
);

// ====================================
// DISABLE RIGHT CLICK ON MEDIA (Optional)
// ====================================
/*
document.querySelectorAll('.video-card, .album-card').forEach(item => {
    item.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        return false;
    });
});
*/

// ====================================
// EASTER EGG - Secret Feature
// ====================================
let clickCount = 0;
const logo = document.querySelector(".nav-logo");

if (logo) {
  logo.addEventListener("click", () => {
    clickCount++;
    if (clickCount === 5) {
      alert("🎵 شكراً لاهتمامك! تابعونا على كل المنصات 🎵");
      clickCount = 0;
    }
  });
}
