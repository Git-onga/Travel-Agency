const images = document.querySelectorAll('.images-grid img');
const scheduleNav = document.getElementById('schedule-nav');
const bookTripBtn = document.querySelectorAll('.tripBtn');
const discoverBtn = document.getElementById('discoverBtn');

// schudule page button trigger
scheduleNav.addEventListener('click', () => {
  window.location.href = 'schedule.html';
})

// book trip button trigger
bookTripBtn.forEach(btn => {
  btn.addEventListener("click", () => {
    window.location.href = 'schedule.html';
  })
})

// discover button trigger
discoverBtn.addEventListener('click', () => {
  window.location.href = 'explore.html';
})

// image rotation logic
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
