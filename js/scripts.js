import { reviews } from '../js/review.js';

const cardsVisible = document.querySelector("#cardsVisible");
const cardsHidden = document.querySelector("#cardsHidden");
const reviewsCollapse = document.querySelector("#reviewsCollapse");
const reviewsToggle = document.querySelector("#reviewsToggle");

function buildStars(rating) {
  let stars = "";
  for (let i = 0; i < 5; i++) {
    stars += i < rating ? "★" : "☆";
  }
  return stars;
}

function createReviewCard(item) {
  const card = document.createElement("section");
  card.classList.add("reviewCard");

  const top = document.createElement("div");
  top.classList.add("reviewTop");

  const name = document.createElement("h3");
  name.classList.add("reviewName");
  name.textContent = item.name;

  const stars = document.createElement("p");
  stars.classList.add("reviewStars");
  stars.textContent = buildStars(item.rating);

  const title = document.createElement("p");
  title.classList.add("reviewTitle");
  title.textContent = item.title;

  const category = document.createElement("span");
  category.classList.add("reviewCategory");
  category.textContent = item.category;

  const reviewText = document.createElement("p");
  reviewText.classList.add("reviewText");
  reviewText.textContent = item.review;

  top.appendChild(name);
  top.appendChild(stars);

  card.appendChild(top);
  card.appendChild(title);
  card.appendChild(category);
  card.appendChild(reviewText);

  return card;
}

reviews.forEach((item, index) => {
  const card = createReviewCard(item);

  if (index < 4) {
    cardsVisible.appendChild(card);
  } else {
    cardsHidden.appendChild(card);
  }
});

if (reviewsToggle && reviewsCollapse) {
  reviewsToggle.addEventListener("click", () => {
    const isOpen = reviewsCollapse.classList.toggle("open");
    reviewsToggle.setAttribute("aria-expanded", String(isOpen));

    if (isOpen) {
      reviewsToggle.innerHTML = `Show fewer reviews <span class="carrot">▴</span>`;
    } else {
      reviewsToggle.innerHTML = `See more reviews <span class="carrot">▾</span>`;
    }
  });
}

window.addEventListener("load", () => {
  const nav = document.getElementById("mobileNav");
  const overlay = document.getElementById("navOverlay");
  const openBtn = document.getElementById("navOpen");
  const closeBtn = document.getElementById("navClose");

  function openNav() {
    nav.classList.add("isOpen");
    nav.setAttribute("aria-hidden", "false");
    openBtn.setAttribute("aria-expanded", "true");
    overlay.hidden = false;
    document.body.style.overflow = "hidden";
  }

  function closeNav() {
    nav.classList.remove("isOpen");
    nav.setAttribute("aria-hidden", "true");
    openBtn.setAttribute("aria-expanded", "false");
    overlay.hidden = true;
    document.body.style.overflow = "";
  }

  openBtn.addEventListener("click", openNav);
  closeBtn.addEventListener("click", closeNav);
  overlay.addEventListener("click", closeNav);

  // notes: Close when you tap a link
  nav.addEventListener("click", (e) => {
    if (e.target.tagName === "A") closeNav();
  });

  // notes: ESC closes
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeNav();
  });
});

window.addEventListener("load", function () {

  document.querySelectorAll(".carousel3").forEach((carousel) => {
    const track = carousel.querySelector(".track");
    const prev = carousel.querySelector('.arrow[data-dir="-1"]');
    const next = carousel.querySelector('.arrow[data-dir="1"]');

    if (!track || !prev || !next) return;

    function getStep() {
      const slide = track.querySelector(".slide");
      if (!slide) return 0;

      const gapStr = getComputedStyle(track).gap || "0px";
      const gap = parseFloat(gapStr) || 0;

      return slide.getBoundingClientRect().width + gap;
    }

    function maxScrollLeft() {
      return track.scrollWidth - track.clientWidth;
    }

    function atStart() {
      return track.scrollLeft <= 1;
    }

    function atEnd() {
      return track.scrollLeft >= maxScrollLeft() - 1;
    }

    prev.addEventListener("click", () => {
      if (atStart()) {
        // jump to end (no animation so it feels instant)
        track.scrollTo({ left: maxScrollLeft(), behavior: "auto" });
        return;
      }
      track.scrollBy({ left: -getStep(), behavior: "smooth" });
    });

    next.addEventListener("click", () => {
      if (atEnd()) {
        // jump to start
        track.scrollTo({ left: 0, behavior: "auto" });
        return;
      }
      track.scrollBy({ left: getStep(), behavior: "smooth" });
    });
  });

});

// FOOTER YEAR
const todaysDate = new Date();
document.querySelector('#year').textContent = todaysDate.getFullYear();
