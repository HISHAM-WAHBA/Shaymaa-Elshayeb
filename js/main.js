// ====================================
// SHAIMAA ELSHAYEB - Portfolio Script
// Modern Interactive Features
// ====================================

// ====================================
// MOBILE NAVIGATION TOGGLE
// ====================================
const navToggle = document.querySelector(".nav-toggle");
const navSocialToggle = document.querySelector(".nav-social-toggle");
const navMenu = document.querySelector(".nav-menu");
const navSocial = document.querySelector(".nav-social");
const navLinks = document.querySelectorAll(".nav-menu a");
const socialLinks = document.querySelectorAll(".nav-social a");

if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    // Close social menu if open
    if (navSocial) navSocial.classList.remove("active");

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

// Social Toggle Logic
if (navSocialToggle && navSocial) {
  navSocialToggle.addEventListener("click", () => {
    navSocial.classList.toggle("active");
    // Close nav menu if open
    navMenu.classList.remove("active");
    const spans = navToggle.querySelectorAll("span");
    spans[0].style.transform = "none";
    spans[1].style.opacity = "1";
    spans[2].style.transform = "none";

    // Icon animation for social toggle
    navSocialToggle.classList.toggle("active");
  });

  // Close menus when clicking outside
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".navbar")) {
      navMenu.classList.remove("active");
      navSocial.classList.remove("active");
      const spans = navToggle.querySelectorAll("span");
      spans[0].style.transform = "none";
      spans[1].style.opacity = "1";
      spans[2].style.transform = "none";
    }
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

// Simplified Observer for general reveals
const itemObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in");
      } else {
        // Remove class when out of view to allow repeat animation
        entry.target.classList.remove("animate-in");
      }
    });
  },
  { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
);

document
  .querySelectorAll(
    ".info-card, .album-card, .video-card, .social-card, .collab-card, .testimonial-card",
  )
  .forEach((item) => {
    itemObserver.observe(item);
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

// 🎵 PLAYER CONFIGURATION 🎵
const songs = [
  {
    title: "Hassa Byaas",
    duration: "0:30",
    path: "../assets/music/Hassa Byaas.mp3", // Add path when available
  },
  {
    title: "Khleny Aaysh",
    duration: "0:30", // Updated duration
    path: "../assets/music/khlyny aaysh.mp3",
  },
  {
    title: "Ayam w Lyaly",
    duration: "0:30",
    path: "../assets/music/ayam w lyaly.mp3", // Add path when available
  },
  {
    title: "Ant Wahshny",
    duration: "0:30",
    path: "../assets/music/ant wahshny.mp3", // Add path when available
  },
  {
    title: "Saab Alya",
    duration: "0:30",
    path: "../assets/music/saab alya.mp3", // Add path when available
  },
];
// ------------------------------------

let currentTrackIndex = 0;
let isPlaying = false;
const audio = new Audio(); // Real Audio Object

const playerLabel = document.querySelector(".current-track-info .name");
const playPauseBtn = document.querySelector(".ctrl-btn.play-pause i");
const progressBar = document.querySelector(".player-progress-bar");
const timeDisplayCurrent = document.getElementById("current-time");
const timeDisplayTotal = document.getElementById("duration");

let trackItemsElements = [];

// Initialize Player
function initPlayer() {
  // Validate required elements
  if (!playerLabel) {
    console.error("Missing element: .current-track-info .name");
    return;
  }
  if (!playPauseBtn) {
    console.error("Missing element: .ctrl-btn.play-pause i");
    return;
  }
  if (!progressBar) {
    console.error("Missing element: .player-progress-bar");
    return;
  }
  if (!timeDisplayCurrent) {
    console.error("Missing element: #current-time");
    return;
  }
  if (!timeDisplayTotal) {
    console.error("Missing element: #duration");
    return;
  }

  renderTrackList();
  trackItemsElements = document.querySelectorAll(".track-item");

  // Add click listeners to tracks
  trackItemsElements.forEach((track, index) => {
    track.addEventListener("click", () => {
      if (currentTrackIndex === index && isPlaying) {
        togglePlay();
      } else {
        playTrack(index);
      }
    });
  });

  // Add listeners to controls
  document
    .querySelector(".ctrl-btn.play-pause")
    .addEventListener("click", togglePlay);
  document.querySelector(".ctrl-btn.prev").addEventListener("click", playPrev);
  document.querySelector(".ctrl-btn.next").addEventListener("click", playNext);

  // Audio Event Listeners
  audio.addEventListener("timeupdate", updateProgress);
  audio.addEventListener("ended", playNext);

  // Initialize time displays with default values
  if (timeDisplayCurrent) timeDisplayCurrent.textContent = "0:00";
  if (timeDisplayTotal) timeDisplayTotal.textContent = "0:00";

  // Initialize with first track info (don't auto-load to save data/noise)
  updatePlayerInfo(0);
}

function playTrack(index) {
  currentTrackIndex = index;
  const songData = songs[index];

  if (!songData.path) {
    alert("Audio file not available for this track yet.");
    return;
  }

  // Update UI Active State
  trackItemsElements.forEach((t) => t.classList.remove("active"));
  if (trackItemsElements[index])
    trackItemsElements[index].classList.add("active");

  // Load and Play
  if (audio.src !== new URL(songData.path, document.baseURI).href) {
    audio.src = songData.path;
  }

  audio
    .play()
    .then(() => {
      isPlaying = true;
      updatePlayButton();
      updatePlayerInfo(index);
      updateListIcon(index, true);
    })
    .catch((error) => {
      isPlaying = false;
      updatePlayButton();
    });
}

function togglePlay() {
  if (audio.paused) {
    if (!audio.src) {
      playTrack(currentTrackIndex);
    } else {
      audio.play();
      isPlaying = true;
    }
  } else {
    audio.pause();
    isPlaying = false;
  }
  updatePlayButton();
  updateListIcon(currentTrackIndex, isPlaying);
}

function playPrev() {
  let newIndex = currentTrackIndex - 1;
  if (newIndex < 0) newIndex = songs.length - 1;
  playTrack(newIndex);
}

function playNext() {
  let newIndex = currentTrackIndex + 1;
  if (newIndex >= songs.length) newIndex = 0;
  playTrack(newIndex);
}

function updatePlayerInfo(index) {
  const songData = songs[index] || { title: "Unknown", duration: "0:00" };
  playerLabel.textContent = songData.title;
  timeDisplayTotal.textContent = songData.duration;

  // Reset all track durations to original
  trackItemsElements.forEach((item, i) => {
    const durEl = item.querySelector(".track-duration");
    if (durEl && songs[i]) durEl.textContent = songs[i].duration;

    const itemBar = item.querySelector(".item-progress");
    if (itemBar) itemBar.style.width = "0%";
  });
}

function updatePlayButton() {
  if (isPlaying) {
    playPauseBtn.classList.replace("fa-play", "fa-pause");
  } else {
    playPauseBtn.classList.replace("fa-pause", "fa-play");
  }
}

function updateListIcon(index, isPlaying) {
  // Reset all list icons
  document.querySelectorAll(".track-item i").forEach((icon) => {
    icon.classList.replace("fa-pause", "fa-play");
  });

  if (isPlaying) {
    const activeItem = trackItemsElements[index];
    if (activeItem) {
      const icon = activeItem.querySelector("i");
      if (icon) icon.classList.replace("fa-play", "fa-pause");
    }
  }
}

function updateProgress() {
  const { currentTime, duration } = audio;
  if (isNaN(duration)) return;

  const percent = (currentTime / duration) * 100;
  progressBar.style.width = `${percent}%`;

  // Format Time
  const formatTime = (time) => {
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  const currentFormatted = formatTime(currentTime);
  timeDisplayCurrent.textContent = currentFormatted;

  // Update active track duration in list
  if (trackItemsElements[currentTrackIndex]) {
    const durationEl =
      trackItemsElements[currentTrackIndex].querySelector(".track-duration");
    if (durationEl) {
      durationEl.textContent = currentFormatted;
    }

    const itemBar =
      trackItemsElements[currentTrackIndex].querySelector(".item-progress");
    if (itemBar) {
      itemBar.style.width = `${percent}%`;
    }
  }
}

function renderTrackList() {
  const trackListContainer = document.querySelector(".track-list");
  if (!trackListContainer) return;

  trackListContainer.innerHTML = "";
  songs.forEach((song, index) => {
    const item = document.createElement("div");
    item.className = `track-item ${index === currentTrackIndex ? "" : ""}`;
    item.innerHTML = `
      <div class="item-progress"></div>
      <i class="fas fa-play play-icon"></i>
      <div class="track-details">
        <span class="track-name">${song.title}</span>
      </div>
      <span class="track-duration">${song.duration}</span>
    `;
    trackListContainer.appendChild(item);
  });
}

// Start
initPlayer();

// ====================================
// VIDEO MODAL POPUP
// ====================================
const videoModal = document.getElementById("video-modal");
const videoIframe = document.getElementById("video-iframe");
const videoModalClose = document.querySelector(".video-modal-close");
const videoModalOverlay = document.querySelector(".video-modal-overlay");

// Function to convert YouTube URL to embed URL
function getYouTubeEmbedUrl(url) {
  // Handle different YouTube URL formats
  let videoId = "";

  // Format: https://www.youtube.com/watch?v=VIDEO_ID
  if (url.includes("youtube.com/watch?v=")) {
    videoId = url.split("v=")[1].split("&")[0];
  }
  // Format: https://youtu.be/VIDEO_ID
  else if (url.includes("youtu.be/")) {
    videoId = url.split("youtu.be/")[1].split("?")[0];
  }
  // Format: https://www.youtube.com/embed/VIDEO_ID
  else if (url.includes("youtube.com/embed/")) {
    videoId = url.split("embed/")[1].split("?")[0];
  }

  return videoId
    ? `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`
    : "";
}

// Open video modal
function openVideoModal(videoUrl) {
  if (!videoUrl || videoUrl.includes("YOUR_YOUTUBE_URL")) {
    alert("Please add a valid YouTube URL to the data-video-url attribute");
    return;
  }

  const embedUrl = getYouTubeEmbedUrl(videoUrl);
  if (embedUrl) {
    videoIframe.src = embedUrl;
    videoModal.classList.add("active");
    document.body.style.overflow = "hidden"; // Prevent scrolling
  } else {
    alert("Invalid YouTube URL format");
  }
}

// Close video modal
function closeVideoModal() {
  videoModal.classList.remove("active");
  videoIframe.src = ""; // Stop video
  document.body.style.overflow = ""; // Restore scrolling
}

// Add click listeners to video cards
document.querySelectorAll(".video-card").forEach((card) => {
  card.addEventListener("click", () => {
    const videoUrl = card.getAttribute("data-video-url");
    openVideoModal(videoUrl);
  });
});

// Close modal on button click
if (videoModalClose) {
  videoModalClose.addEventListener("click", closeVideoModal);
}

// Close modal on overlay click
if (videoModalOverlay) {
  videoModalOverlay.addEventListener("click", closeVideoModal);
}

// Close modal on ESC key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && videoModal.classList.contains("active")) {
    closeVideoModal();
  }
});

// ====================================
// BOOKING BUTTON
// ====================================
const bookingBtn = document.querySelector(".btn-booking");
if (bookingBtn) {
  bookingBtn.addEventListener("click", () => {
    window.location.href =
      "mailto:booking@shaimaaelshayeb.com?subject=Concert Booking&body=I would like to inquire about booking a concert";
  });
}

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

// Interactive Parallax on Mouse Move
const hero = document.querySelector(".hero");
if (hero) {
  hero.addEventListener("mousemove", (e) => {
    const icon = document.querySelector(".hero-bg-icon");
    const content = document.querySelector(".hero-content");
    if (icon) {
      const moveX = (e.clientX - window.innerWidth / 2) * 0.05;
      const moveY = (e.clientY - window.innerHeight / 2) * 0.05;
      icon.style.transform = `translate(${moveX}px, ${moveY}px) rotate(${moveX * 0.1}deg)`;
    }
    if (content) {
      const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
      const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
      content.style.transform = `translate(${moveX}px, ${moveY}px)`;
    }
  });
}

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
  { threshold: 0.5 },
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
  document.body.style.transition = "opacity 0.8s ease-in-out";

  setTimeout(() => {
    document.body.style.opacity = "1";
    // Trigger hero animations once loaded
    const heroContent = document.querySelector(".hero-content");
    if (heroContent) {
      heroContent.style.animation = "fadeInUp 1.5s ease forwards";
    }
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
      alert("Email copied: " + email);
    });
  });
});

// ====================================
// EASTER EGG - Secret Feature
// ====================================
let clickCount = 0;
const logo = document.querySelector(".nav-logo");

if (logo) {
  logo.addEventListener("click", () => {
    clickCount++;
    if (clickCount === 5) {
      alert("🎵 Thanks for your interest! Follow us on all platforms 🎵");
      clickCount = 0;
    }
  });
}
