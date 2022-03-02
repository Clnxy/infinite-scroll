const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
const imgCount = 30;
const apiKey = 'VISBjTDNjPWFS3nQ5D68q2m8TiSfOlOxeJM0g62XK-w';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${imgCount}`;

// Check if all images were loaded
function imageLoaded() {
    imagesLoaded++;
    switch (imagesLoaded) {
        case 3:
            loader.hidden = true;
        default:
            ready = true;
            break;
    }
}

// Helper Function to set Attributes on DOM Elements
function setAttributes(Element, Attributes) {
    for (const key in Attributes) {
        Element.setAttribute(key, Attributes[key])
    }
}

// Create Elements For Links & Photos,Add to DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    // Run function for each object in photosArray
    photosArray.forEach((photo) => {
        //   Create <a> to link to Unsplash
        const item = document.createElement('a');

        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });

        // Create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });

        // Check when each is finished loading
        img.addEventListener('load', imageLoaded)

        // Put <img> inside <a>, then put both inside imageContainer Element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// Get photos from Unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
        // Catch Error Here
    }
}

// Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
});

// On Load
getPhotos();