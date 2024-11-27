// Wait until the DOM is fully loaded
const hamburger = document.getElementById("hamburger-icon");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

// Gallery functionality
// Wait until the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  const galleryData = {
    "gallery-1": [
      "./img/model_Khafre_1.png",
      "./img/model_Khafre_2.png",
      "./img/model_Khafre_3.png",
      "./img/model_Khafre_4.png",
    ],
    "gallery-2": [
      "./img/model_AmenemhatIII_1.png",
      "./img/model_AmenemhatIII_2.png",
      "./img/model_AmenemhatIII_3.png",
      "./img/model_AmenemhatIII_4.png",
    ],
    "gallery-3": [
      "./img/model_RamessesII_1.png",
      "./img/model_RamessesII_2.png",
      "./img/model_RamessesII_3.png",
      "./img/model_RamessesII_4.png",
      "./img/model_RamessesII_5.png",
    ],
    "gallery-4": [
      "./img/model_RamessesIII_1.png",
      "./img/model_RamessesIII_2.png",
      "./img/model_RamessesIII_3.png",
      "./img/model_RamessesIII_4.png",
      "./img/model_RamessesIII_5.png",
    ],
  };

  // Function to create dots for a gallery
  function createGalleryDots(galleryId) {
    const galleryControls = document.querySelector(
      `#${galleryId} .gallery-controls`
    );
    const images = galleryData[galleryId];

    // Clear existing dots if any
    galleryControls.innerHTML = "";

    // Create a dot for each image
    images.forEach((_, index) => {
      const dot = document.createElement("button");
      dot.className = "gallery-dot" + (index === 0 ? " active" : "");
      dot.setAttribute("aria-label", `Go to image ${index + 1}`);
      galleryControls.appendChild(dot);
    });
  }

  // Function to update gallery image
  function updateImage(galleryId, index) {
    const galleryImage = document.querySelector(`#${galleryId} .gallery-image`);
    const dots = document.querySelectorAll(`#${galleryId} .gallery-dot`);

    if (galleryImage && dots.length > 0) {
      galleryImage.src = galleryData[galleryId][index];
      dots.forEach((dot) => dot.classList.remove("active"));
      dots[index].classList.add("active");
      galleryImage.setAttribute(
        "aria-label",
        `Image ${index + 1} of ${galleryData[galleryId].length}`
      );
    }
  }

  // Initialize galleries
  Object.keys(galleryData).forEach((galleryId) => {
    // Create dots for this gallery
    createGalleryDots(galleryId);

    // Add click event listeners to dots
    const dots = document.querySelectorAll(`#${galleryId} .gallery-dot`);
    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        updateImage(galleryId, index);
      });

      // Add keyboard navigation for dots
      dot.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          updateImage(galleryId, index);
        }
      });
    });

    // Add keyboard navigation for gallery container
    const galleryContainer = document.getElementById(galleryId);
    let currentImageIndex = 0;

    if (galleryContainer) {
      galleryContainer.addEventListener("keydown", (e) => {
        if (e.key === "ArrowLeft") {
          currentImageIndex =
            (currentImageIndex - 1 + galleryData[galleryId].length) %
            galleryData[galleryId].length;
          updateImage(galleryId, currentImageIndex);
        } else if (e.key === "ArrowRight") {
          currentImageIndex =
            (currentImageIndex + 1) % galleryData[galleryId].length;
          updateImage(galleryId, currentImageIndex);
        }
      });
    }
  });
});
