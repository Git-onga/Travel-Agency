// DOM Elements
const heroCarousel = document.querySelector('.hero-carousel');
const carouselImages = document.querySelectorAll('.hero-carousel img');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');
const tripForm = document.querySelector('.trip-planner-form');
const destinationSelect = document.getElementById('destination');
const tourOptions = document.getElementById('tour-options');
const testimonialContainer = document.querySelector('.testimonials-container');
const testimonialCards = document.querySelectorAll('.testimonial-card');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navMenu = document.querySelector('nav ul');

// Current slide index for carousel
let currentSlide = 0;
const totalSlides = carouselImages.length;

// Initialize the carousel
function initCarousel() {
    carouselImages.forEach((img, index) => {
        img.style.transform = `translateX(${index * 100}%)`;
    });
}

// Next slide function
function nextSlide() {
    if (currentSlide === totalSlides - 1) {
        currentSlide = 0;
    } else {
        currentSlide++;
    }
    
    carouselImages.forEach((img, index) => {
        img.style.transform = `translateX(${100 * (index - currentSlide)}%)`;
    });
}

// Previous slide function
function prevSlide() {
    if (currentSlide === 0) {
        currentSlide = totalSlides - 1;
    } else {
        currentSlide--;
    }
    
    carouselImages.forEach((img, index) => {
        img.style.transform = `translateX(${100 * (index - currentSlide)}%)`;
    });
}

// Update tour options based on destination
function updateTourOptions() {
    const destination = destinationSelect.value;
    tourOptions.innerHTML = '';
    
    if (destination === 'paris') {
        addTourOption('Cultural Tour', 'Explore museums and historical sites');
        addTourOption('Food Tour', 'Taste authentic French cuisine');
        addTourOption('Night Tour', 'See Paris illuminated at night');
    } else if (destination === 'tokyo') {
        addTourOption('Anime Tour', 'Visit famous anime locations');
        addTourOption('Temple Tour', 'Explore ancient temples');
        addTourOption('Shopping Tour', 'Discover trendy districts');
    } else if (destination === 'new-york') {
        addTourOption('Broadway Tour', 'Experience theater district');
        addTourOption('Landmarks Tour', 'See Statue of Liberty, Empire State');
        addTourOption('Food Truck Tour', 'Taste diverse street food');
    } else if (destination === 'bali') {
        addTourOption('Beach Tour', 'Relax on beautiful beaches');
        addTourOption('Yoga Retreat', 'Join wellness activities');
        addTourOption('Waterfall Tour', 'Explore jungle waterfalls');
    }
}

// Helper function to add tour options
function addTourOption(name, description) {
    const div = document.createElement('div');
    div.className = 'tour-option';
    div.innerHTML = `
        <input type="checkbox" id="${name.toLowerCase().replace(' ', '-')}" name="tours" value="${name}">
        <label for="${name.toLowerCase().replace(' ', '-')}">
            <strong>${name}</strong>: ${description}
        </label>
    `;
    tourOptions.appendChild(div);
}

// Form validation
function validateForm(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const errors = [];
    
    // Check required fields
    if (!formData.get('departure-date')) errors.push('Departure date is required');
    if (!formData.get('return-date')) errors.push('Return date is required');
    if (!formData.get('destination')) errors.push('Destination is required');
    
    // Check date logic
    const departureDate = new Date(formData.get('departure-date'));
    const returnDate = new Date(formData.get('return-date'));
    if (returnDate < departureDate) errors.push('Return date must be after departure date');
    
    // Display errors or submit
    const errorContainer = document.querySelector('.form-errors');
    if (errors.length > 0) {
        errorContainer.innerHTML = errors.map(err => `<p class="error">${err}</p>`).join('');
        errorContainer.style.display = 'block';
    } else {
        errorContainer.style.display = 'none';
        // In a real app, you would submit the form here
        alert('Your trip has been planned successfully! We will contact you shortly.');
        form.reset();
    }
}

// Testimonial slider
let currentTestimonial = 0;
function showTestimonial(index) {
    testimonialCards.forEach((card, i) => {
        card.style.display = i === index ? 'block' : 'none';
    });
}

function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
    showTestimonial(currentTestimonial);
}

function prevTestimonial() {
    currentTestimonial = (currentTestimonial - 1 + testimonialCards.length) % testimonialCards.length;
    showTestimonial(currentTestimonial);
}

// Mobile menu toggle
function toggleMobileMenu() {
    navMenu.classList.toggle('active');
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    // Initialize carousel
    initCarousel();
    
    // Set up event listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // Auto-advance carousel every 5 seconds
    setInterval(nextSlide, 5000);
    
    // Destination change listener
    destinationSelect.addEventListener('change', updateTourOptions);
    
    // Form submission
    tripForm.addEventListener('submit', validateForm);
    
    // Testimonial navigation
    document.querySelector('.testimonial-next').addEventListener('click', nextTestimonial);
    document.querySelector('.testimonial-prev').addEventListener('click', prevTestimonial);
    
    // Show first testimonial
    showTestimonial(0);
    
    // Mobile menu
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // Animation on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.animate');
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animated');
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load
});
