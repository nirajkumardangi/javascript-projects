const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.querySelector('.lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const closeBtn = document.getElementById('close-btn');

// Open lightbox when thumbnail is clicked
galleryItems.forEach((item) => {
  item.addEventListener('click', () => {
    const fullImageSrc = item.src.replace('-thumbnail', '');
    lightboxImage.src = fullImageSrc;
    lightbox.style.display = 'flex';
  });
});

// Close lightbox when clicking close button
closeBtn.addEventListener('click', () => {
  lightbox.style.display = 'none';
});

// Close lightbox when clicking outside image (on lightbox background)
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    lightbox.style.display = 'none';
  }
});
