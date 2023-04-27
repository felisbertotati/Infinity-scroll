// unsplash Api

console.log("hello world");

const count = 10;
const apiKey = "XjH1BNtLqY5aFKqD_wj0CSp5kikN6_IdGF8R5fhO3fk";
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

// Get photos from unsplash Api

async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    //catch error here
  }
}

//on load
getPhotos();
