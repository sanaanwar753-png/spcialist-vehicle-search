const form = document.getElementById("form");
const search = document.getElementById("search");
const fuel = document.getElementById("fuel");
const year = document.getElementById("year");
const results = document.getElementById("results");
const minPrice = document.getElementById("minPrice");
const maxPrice = document.getElementById("maxPrice");
 
function showVehicles(list) {
    results.innerHTML = '';
    if (list.length === 0) {
        results.innerHTML = "<p class='no-data'>No vehicles found.</p>";
        return;
    }
    list.forEach(function(v) {
        let article = document.createElement('article');
       
        let img = document.createElement('img');
        img.src = v.image;
        img.alt = v.make + " " + v.model;
 
    // create title
    let title = document.createElement("h3");
    title.textContent = v.make + " " + v.model;
 
    // create details
    let yearText = document.createElement("p");
    yearText.textContent = "Year: " + v.year;
 
    let colourText = document.createElement("p");
    colourText.textContent = "Colour: " + v.colour;
 
    let fuelText = document.createElement("p");
    fuelText.textContent = "Fuel: " + v.fuel;
 
    let priceText = document.createElement("p");
    priceText.className = "price";
    priceText.textContent = "£" + v.price;

 
    // add everything to article
    article.appendChild(img);
    article.appendChild(title);
    article.appendChild(yearText);
    article.appendChild(colourText);
    article.appendChild(fuelText);
    article.appendChild(priceText);
    // add article to page
    results.appendChild(article);
 
  });
 
}
 
 
// when user clicks search
form.addEventListener("submit", function(e) {
 
  // stop page reload
  e.preventDefault();
 
  // get search text
  let text = search.value.toLowerCase().trim();
  let fuelType = fuel.value;
  let minYear = parseInt(year.value) || 0;
  let priceMin = parseInt(minPrice.value) || 0;
  let priceMax = parseInt(maxPrice.value) || Infinity;

  if (priceMin > priceMax) {
    alert("Minimum price cannot be greater than maximum price.");
    return;
  }
  if (minYear < 1900 || minYear > new Date().getFullYear()) {
    alert("Please enter a valid year.");
    return;
  }

// filter vehicles based on search
  let filtered = vehicles.filter(function(v) {
 
    let matchSearch =
      v.make.toLowerCase().includes(text) ||
      v.model.toLowerCase().includes(text);
 
    let matchFuel =
      fuelType === "" || v.fuel === fuelType;
    let matchYear =
      minYear === 0 || v.year >= minYear;


    let matchPrice = v.price >= priceMin && v.price <= priceMax;
    return matchSearch && matchFuel && matchYear && matchPrice;
 
  });
 
  // show results
  showVehicles(filtered);
 
});

