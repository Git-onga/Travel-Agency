const images = document.querySelectorAll('.images-grid img');
let index = 0;

function rotateImages() {
  // remove active class from all
  images.forEach(img => img.classList.remove('active'));

  // add active class to current image
  images[index].classList.add('active');

  // move to next
  index = (index + 1) % images.length;
}

// run immediately + every 2s
rotateImages();
setInterval(rotateImages, 2000);
