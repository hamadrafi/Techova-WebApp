// //Dark Mode
// const toggleBtn = document.getElementById("darkModeToggle");
// const themeIcon = document.getElementById("themeIcon");
// const html = document.documentElement;

// toggleBtn.addEventListener("click", () => {
//   // start fade out
//   themeIcon.classList.add("fading-out");

//   setTimeout(() => {
//     // swap icon
//     if (html.getAttribute("data-bs-theme") === "light") {
//       html.setAttribute("data-bs-theme", "dark");
//       themeIcon.classList.replace("bi-moon-fill", "bi-sun-fill");
//     } else {
//       html.setAttribute("data-bs-theme", "light");
//       themeIcon.classList.replace("bi-sun-fill", "bi-moon-fill");
//     }

//     // fade back in
//     themeIcon.classList.remove("fading-out");
//     themeIcon.classList.add("fading-in");

//     setTimeout(() => {
//       themeIcon.classList.remove("fading-in");
//     }, 300);
//   }, 150);
// });
const toggleBtn = document.getElementById("darkModeToggle");
const themeIcon = document.getElementById("themeIcon");
const body = document.body;

toggleBtn.addEventListener("click", () => {
  body.classList.toggle("dark-mode");

  // Swap icon
  if (body.classList.contains("dark-mode")) {
    themeIcon.classList.replace("bi-moon-fill", "bi-sun-fill");
  } else {
    themeIcon.classList.replace("bi-sun-fill", "bi-moon-fill");
  }
});

//Animation on Features
// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in-up");
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Initialize animations when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Observe feature cards
  const featureCards = document.querySelectorAll(".feature-card");
  featureCards.forEach((card) => {
    observer.observe(card);
  });

  // Add loaded class to container for smooth reveal
  setTimeout(() => {
    document.getElementById("featuresContainer").classList.add("loaded");
  }, 100);

  // Add subtle parallax effect to section background on scroll
  let ticking = false;

  function updateParallax() {
    const scrolled = window.pageYOffset;
    const section = document.querySelector(".features-section");
    const speed = 0.05;
    const yPos = scrolled * speed;

    section.style.backgroundPosition = `center calc(50% + ${yPos}px)`;
    ticking = false;
  }
  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }

  window.addEventListener("scroll", requestTick);

  // Enhanced hover effects with mouse tracking
  featureCards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.02)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });

  // Smooth scroll for any potential navigation
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Performance optimization: Reduce animations on low-end devices
  if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
    document.body.classList.add("reduce-motion");
  }
});

// Handle window resize for responsive optimizations
let resizeTimeout;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    // Recalculate animations if needed
    const cards = document.querySelectorAll(".feature-card");
    cards.forEach((card) => {
      card.style.transform = "";
    });
  }, 100);
});

// Preload critical resources
const preloadLinks = [
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/webfonts/fa-solid-900.woff2",
];

preloadLinks.forEach((href) => {
  const link = document.createElement("link");
  link.rel = "preload";
  link.as = "font";
  link.type = "font/woff2";
  link.crossOrigin = "anonymous";
  link.href = href;
  document.head.appendChild(link);
});

//Testominal Section Animation
// JavaScript for scroll animations
document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(".animate-on-scroll");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Add a staggered delay
          setTimeout(() => {
            entry.target.classList.add("visible");
          }, index * 150); // 150ms delay between elements
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  elements.forEach((element) => observer.observe(element));
});

//Show Case Section
class ProductShowcase {
  constructor() {
    this.currentSlide = 0;
    this.images = [
      "assests/imgs/TechNova-Main.jpg",
      "assests/imgs/TechNova-SideProfile.png",
      "assests/imgs/TechNova-BackView.png",
    ];
    this.modalImages = [
      "assests/imgs/TechNova-Main.jpg",
      "assests/imgs/TechNova-SideProfile.png",
      "assests/imgs/TechNova-BackView.png",
    ];

    this.init();
  }

  init() {
    this.setupInfiniteSlider();
    this.setupScrollReveal();
    this.setupDotNavigation();
    this.setupModalImage();
    this.checkReducedMotion();
  }

  setupInfiniteSlider() {
    setInterval(() => {
      if (!document.querySelector(".product-card:hover")) {
        this.nextSlide();
      }
    }, 4000);
  }

  nextSlide() {
    const images = document.querySelectorAll(".product-image");
    const dots = document.querySelectorAll(".dot");

    images[this.currentSlide].classList.remove("active");
    dots[this.currentSlide].classList.remove("active");

    this.currentSlide = (this.currentSlide + 1) % images.length;

    images[this.currentSlide].classList.add("active");
    dots[this.currentSlide].classList.add("active");
  }

  setupDotNavigation() {
    const dots = document.querySelectorAll(".dot");
    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        this.goToSlide(index);
      });
    });
  }

  goToSlide(slideIndex) {
    const images = document.querySelectorAll(".product-image");
    const dots = document.querySelectorAll(".dot");

    images[this.currentSlide].classList.remove("active");
    dots[this.currentSlide].classList.remove("active");

    this.currentSlide = slideIndex;

    images[this.currentSlide].classList.add("active");
    dots[this.currentSlide].classList.add("active");
  }

  setupScrollReveal() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal");
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    document.querySelectorAll("[data-reveal]").forEach((el) => {
      observer.observe(el);
    });
  }

  setupModalImage() {
    const modal = document.getElementById("productModal");
    const modalImage = document.getElementById("modalImage");

    modal.addEventListener("show.bs.modal", () => {
      modalImage.src = this.modalImages[this.currentSlide];
    });
  }

  checkReducedMotion() {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    if (prefersReducedMotion.matches) {
      document.querySelectorAll(".product-card").forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "none";
      });
    }
  }
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new ProductShowcase();
});

//Faq Section
// Smooth scroll animation for FAQ container
function animateOnScroll() {
  const faqContainer = document.querySelector(".faq-container");
  const containerPosition = faqContainer.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  // Check if the container is in viewport (with some offset for better timing)
  if (
    containerPosition.top < windowHeight * 0.8 &&
    containerPosition.bottom > 0
  ) {
    faqContainer.classList.add("animate-in");
  }
}

// Run animation check on page load
document.addEventListener("DOMContentLoaded", animateOnScroll);

// Run animation check on scroll
window.addEventListener("scroll", animateOnScroll);

// Optional: Run once more after a short delay to catch any timing issues
setTimeout(animateOnScroll, 100);
