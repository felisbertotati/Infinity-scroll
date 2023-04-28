// unsplash Api
const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

let photosArray = [];

let count = 5;
const apiKey = "Your_API_Key";
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

// check if all images were load
function imageLoaded() {
  console.log("image loaded");
  imagesLoaded++;
  console.log("imagesLoaded");
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    count = 30;
  }
}

//helper function to set attributes on DOM elements

function setAttribute(elemnet, attributes) {
  for (const key in attributes) {
    elemnet.setAttribute(key, attributes[key]);
  }
}

//Create Elements for links & Photos, Add to Dom

function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  console.log("total images", totalImages);
  //run function for each object in photoArray
  photosArray.forEach((photo) => {
    // create <a> to link to unsplash
    const item = document.createElement("a");

    //create <img> for photo
    setAttribute(item, {
      href: photo.links.html,
      target: "_blank",
    });
    const img = document.createElement("img");

    setAttribute(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    //Event listener, check when each is finished loading
    img.addEventListener("load", imageLoaded);

    // Put <img> inside <a>, then put both inside imageContainer Element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Get photos from unsplash Api

async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {
    //catch error here
  }
}

// Check to see if scrolling near bottom of page, load more photos

window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

//on load
getPhotos();
